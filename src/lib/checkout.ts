import { z } from 'zod';

import { UMBRAL_ENVIO_GRATIS, calcularCostoEnvio } from '@/lib/envio';
import type {
  IApiResponse,
  ICarritoItem,
  IDatosEnvio,
  IOrden,
  IOrdenCreada,
  IPreferenciaPago,
  IResumenCheckout,
} from '@/types';

export const datosEnvioSchema = z.object({
  nombre: z.string().trim().min(3, 'Escribe tu nombre completo').max(100),
  email: z.string().trim().email('Email inválido'),
  telefono: z.string().trim().min(7, 'Teléfono demasiado corto').max(20),
  direccion: z.string().trim().min(5, 'Escribe tu dirección completa').max(200),
  ciudad: z.string().trim().min(2, 'Ciudad requerida').max(100),
  departamento: z.string().trim().min(2, 'Departamento requerido').max(100),
  codigoPostal: z.string().trim().max(20),
});

export function calcularTotales(items: ICarritoItem[]): IResumenCheckout {
  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const envio = calcularCostoEnvio(subtotal);

  return {
    subtotal,
    envio,
    total: subtotal + envio,
    faltaParaEnvioGratis: Math.max(UMBRAL_ENVIO_GRATIS - subtotal, 0),
  };
}

export function mapearErrores(
  issues: { path: PropertyKey[]; message: string }[]
): Partial<Record<keyof IDatosEnvio, string>> {
  const errores: Partial<Record<keyof IDatosEnvio, string>> = {};

  for (const issue of issues) {
    const campo = String(issue.path[0]);
    // Por qué: el primer mensaje de cada campo es el más útil para quien llena el form
    if (campo && !(campo in errores)) errores[campo as keyof IDatosEnvio] = issue.message;
  }

  return errores;
}

export function construirOrden(
  datos: IDatosEnvio,
  items: ICarritoItem[]
): IOrden {
  return {
    ...datos,
    codigoPostal: datos.codigoPostal?.trim() || undefined,
    items: items.map((item) => ({
      productoId: item.productoId,
      varianteId: item.varianteId,
      cantidad: item.cantidad,
      precio: item.precio,
    })),
  };
}

export function elegirUrlPreferencia(preferencia: IPreferenciaPago): string | null {
  // Por qué: con credenciales de prueba Mercado Pago llena sandbox_init_point;
  // en producción se navega al init_point real.
  return preferencia.sandboxInitPoint ?? preferencia.initPoint;
}

async function pedirJson<T>(ruta: string, cuerpo: unknown): Promise<T> {
  const respuesta = await fetch(ruta, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

  const json = (await respuesta.json()) as IApiResponse<T>;

  if (!respuesta.ok || json.error || !json.data) {
    throw new Error(json.message || 'No se pudo procesar tu pedido');
  }

  return json.data;
}

export async function iniciarPago(orden: IOrden): Promise<string> {
  // Por qué: la orden se registra antes de pagar para que el webhook de
  // Mercado Pago pueda marcarla como pagada cuando el pago se confirme.
  const ordenCreada = await pedirJson<IOrdenCreada>('/api/orders', orden);

  // Por qué: el id real viaja a la preferencia como external_reference; si se
  // pierde, el webhook no sabe a qué orden asignar el pago (Number('...') = NaN).
  const preferencia = await pedirJson<IPreferenciaPago>('/api/mercado-pago', {
    orden,
    ordenId: ordenCreada.id,
  });
  const url = elegirUrlPreferencia(preferencia);

  if (!url) throw new Error('Mercado Pago no devolvió el enlace de pago');
  return url;
}
