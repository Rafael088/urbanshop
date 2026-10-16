import { COSTO_ENVIO, UMBRAL_ENVIO_GRATIS, calcularCostoEnvio } from '@/lib/envio';

describe('calcularCostoEnvio', () => {
  it('debe cobrar el envío cuando el subtotal está bajo el umbral', () => {
    expect(calcularCostoEnvio(50000)).toBe(COSTO_ENVIO);
  });

  it('debe dar envío gratis desde el umbral', () => {
    expect(calcularCostoEnvio(UMBRAL_ENVIO_GRATIS)).toBe(0);
    expect(calcularCostoEnvio(UMBRAL_ENVIO_GRATIS + 1)).toBe(0);
  });

  it('debe dar envío gratis cuando el carrito está vacío', () => {
    expect(calcularCostoEnvio(0)).toBe(0);
  });
});
