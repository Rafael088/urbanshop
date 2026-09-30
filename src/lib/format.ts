const formateadorCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
});

export function formatearPrecio(valor: number): string {
  return formateadorCOP.format(valor);
}
