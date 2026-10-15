// Fuente única del cálculo de envío: la usan el resumen del carrito/checkout
// (frontend) y las APIs de órdenes y Mercado Pago (backend), para que el total
// mostrado, el guardado en BD y el cobrado por Mercado Pago siempre coincidan.
export const UMBRAL_ENVIO_GRATIS = 200000;
export const COSTO_ENVIO = 15000;

export function calcularCostoEnvio(subtotal: number): number {
  return subtotal === 0 || subtotal >= UMBRAL_ENVIO_GRATIS ? 0 : COSTO_ENVIO;
}
