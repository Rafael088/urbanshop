import {
  calcularTotales,
  construirOrden,
  datosEnvioSchema,
  elegirUrlPreferencia,
  iniciarPago,
  mapearErrores,
} from '@/lib/checkout';
import type { ICarritoItem, IDatosEnvio } from '@/types';

const crearItem = (sobrescribir: Partial<ICarritoItem> = {}): ICarritoItem => ({
  productoId: 1,
  varianteId: 1,
  cantidad: 1,
  precio: 50000,
  nombre: 'Camiseta',
  imagen: '/img.jpg',
  ...sobrescribir,
});

const datosValidos: IDatosEnvio = {
  nombre: 'Ana Torres',
  email: 'ana@correo.com',
  telefono: '3001234567',
  direccion: 'Calle 10 # 20-30',
  ciudad: 'Bogotá',
  departamento: 'Cundinamarca',
  codigoPostal: '110111',
};

describe('calcularTotales', () => {
  it('debe cobrar envío cuando el subtotal queda bajo el umbral', () => {
    const totales = calcularTotales([crearItem({ precio: 50000 })]);

    expect(totales.subtotal).toBe(50000);
    expect(totales.envio).toBe(15000);
    expect(totales.total).toBe(65000);
  });

  it('debe dar envío gratis desde el umbral', () => {
    const totales = calcularTotales([crearItem({ precio: 200000 })]);

    expect(totales.envio).toBe(0);
    expect(totales.total).toBe(200000);
    expect(totales.faltaParaEnvioGratis).toBe(0);
  });

  it('debe multiplicar precio por cantidad de cada item', () => {
    const totales = calcularTotales([crearItem({ precio: 30000, cantidad: 3 })]);

    expect(totales.subtotal).toBe(90000);
    expect(totales.total).toBe(105000);
  });
});

describe('datosEnvioSchema', () => {
  it('debe aceptar datos válidos', () => {
    expect(datosEnvioSchema.safeParse(datosValidos).success).toBe(true);
  });

  it('debe rechazar un email inválido', () => {
    const resultado = datosEnvioSchema.safeParse({ ...datosValidos, email: 'no-es-email' });

    expect(resultado.success).toBe(false);
  });

  it('debe rechazar un nombre muy corto', () => {
    const resultado = datosEnvioSchema.safeParse({ ...datosValidos, nombre: 'An' });

    expect(resultado.success).toBe(false);
  });
});

describe('mapearErrores', () => {
  it('debe convertir los issues de Zod en errores por campo', () => {
    const errores = mapearErrores([
      { path: ['email'], message: 'Email inválido' },
      { path: ['nombre'], message: 'Nombre requerido' },
    ]);

    expect(errores).toEqual({ email: 'Email inválido', nombre: 'Nombre requerido' });
  });

  it('debe conservar solo el primer error de cada campo', () => {
    const errores = mapearErrores([
      { path: ['nombre'], message: 'Primer error' },
      { path: ['nombre'], message: 'Segundo error' },
    ]);

    expect(errores).toEqual({ nombre: 'Primer error' });
  });
});

describe('construirOrden', () => {
  it('debe mapear los items del carrito a IOrdenItem (sin datos de UI)', () => {
    const orden = construirOrden(datosValidos, [
      crearItem({ talla: 'M', color: 'Negro', imagen: '/img.jpg' }),
    ]);

    expect(orden.items).toEqual([
      { productoId: 1, varianteId: 1, cantidad: 1, precio: 50000 },
    ]);
  });

  it('debe omitir codigoPostal cuando viene vacío', () => {
    const orden = construirOrden({ ...datosValidos, codigoPostal: '   ' }, [crearItem()]);

    expect(orden.codigoPostal).toBeUndefined();
  });
});

describe('elegirUrlPreferencia', () => {
  it('debe preferir sandbox_init_point con credenciales de prueba', () => {
    const url = elegirUrlPreferencia({
      preferenceId: 'abc',
      initPoint: 'https://mp/prod',
      sandboxInitPoint: 'https://mp/test',
    });

    expect(url).toBe('https://mp/test');
  });

  it('debe usar init_point cuando no hay sandbox', () => {
    const url = elegirUrlPreferencia({
      preferenceId: 'abc',
      initPoint: 'https://mp/prod',
      sandboxInitPoint: null,
    });

    expect(url).toBe('https://mp/prod');
  });
});

interface LlamadaFetch {
  ruta: string;
  cuerpo: unknown;
}

describe('iniciarPago', () => {
  const orden = construirOrden(datosValidos, [crearItem()]);
  const fetchOriginal = global.fetch;

  function espiarFetch(respuestas: Record<string, unknown>): LlamadaFetch[] {
    const llamadas: LlamadaFetch[] = [];

    (global.fetch as jest.Mock).mockImplementation(
      async (ruta: string, init?: { body?: string }): Promise<unknown> => {
        llamadas.push({ ruta, cuerpo: init?.body ? JSON.parse(init.body) : null });
        return { ok: true, json: async () => ({ data: respuestas[ruta], error: null, message: 'ok' }) };
      }
    );

    return llamadas;
  }

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = fetchOriginal;
  });

  it('debe registrar la orden y enviar su id como ordenId a la preferencia', async () => {
    const llamadas = espiarFetch({
      '/api/orders': { id: 42 },
      '/api/mercado-pago': { preferenceId: 'p1', initPoint: 'https://mp/prod', sandboxInitPoint: null },
    });

    const url = await iniciarPago(orden);

    expect(url).toBe('https://mp/prod');
    expect(llamadas.map((llamada) => llamada.ruta)).toEqual(['/api/orders', '/api/mercado-pago']);
    expect(llamadas[1].cuerpo).toMatchObject({ ordenId: 42 });
  });

  it('debe avisar cuando Mercado Pago no devuelve enlace de pago', async () => {
    espiarFetch({
      '/api/orders': { id: 7 },
      '/api/mercado-pago': { preferenceId: 'p2', initPoint: null, sandboxInitPoint: null },
    });

    await expect(iniciarPago(orden)).rejects.toThrow('Mercado Pago no devolvió el enlace de pago');
  });

  it('debe propagar el mensaje de error del backend', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      async (): Promise<unknown> => ({
        ok: false,
        json: async () => ({ data: null, error: 'Datos inválidos', message: 'Datos inválidos' }),
      })
    );

    await expect(iniciarPago(orden)).rejects.toThrow('Datos inválidos');
  });
});
