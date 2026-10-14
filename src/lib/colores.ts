// Mapa de nombres de color del catálogo a valores hexadecimales para la UI.
// Así un botón "Rojo" se pinta de rojo y "Negro" de negro.
const COLORES_HEX: Record<string, string> = {
  Negro: '#1B1A17',
  Blanco: '#FFFFFF',
  Gris: '#8B8B84',
  'Verde oliva': '#5F6B3A',
  Azul: '#3D5A80',
  Beige: '#D9CDB5',
  Rojo: '#C43D2B',
};

const COLOR_DESCONOCIDO = '#CFC5AC';

export function obtenerHexColor(nombreColor: string): string {
  return COLORES_HEX[nombreColor] ?? COLOR_DESCONOCIDO;
}

// Los colores claros necesitan un borde para distinguirse sobre fondo blanco.
export function esColorClaro(nombreColor: string): boolean {
  return nombreColor === 'Blanco' || nombreColor === 'Beige';
}
