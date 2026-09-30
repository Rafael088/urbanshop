import type { ICarritoItem } from '@/types';

const CART_KEY = 'ecommerce-cart';

function guardarCarrito(carrito: ICarritoItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

function esMismoItem(item: ICarritoItem, productoId: number, varianteId: number): boolean {
  return item.productoId === productoId && item.varianteId === varianteId;
}

export function obtenerCarrito(): ICarritoItem[] {
  // En el servidor no existe localStorage
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? (JSON.parse(cart) as ICarritoItem[]) : [];
}

export function agregarItem(nuevoItem: ICarritoItem): void {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) =>
    esMismoItem(item, nuevoItem.productoId, nuevoItem.varianteId)
  );

  if (existente) {
    existente.cantidad += nuevoItem.cantidad;
  } else {
    carrito.push(nuevoItem);
  }

  guardarCarrito(carrito);
}

export function quitarItem(productoId: number, varianteId: number): void {
  const filtrado = obtenerCarrito().filter(
    (item) => !esMismoItem(item, productoId, varianteId)
  );
  guardarCarrito(filtrado);
}

export function actualizarCantidad(productoId: number, varianteId: number, cantidad: number): void {
  if (cantidad <= 0) {
    quitarItem(productoId, varianteId);
    return;
  }
  const carrito = obtenerCarrito().map((item) =>
    esMismoItem(item, productoId, varianteId) ? { ...item, cantidad } : item
  );
  guardarCarrito(carrito);
}

export function limpiarCarrito(): void {
  localStorage.removeItem(CART_KEY);
}

export function calcularTotalCarrito(carrito: ICarritoItem[]): number {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
