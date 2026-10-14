import {
  agregarItem,
  actualizarCantidad,
  calcularTotalCarrito,
  limpiarCarrito,
  obtenerCarrito,
  quitarItem,
} from '@/lib/cart';
import type { ICarritoItem } from '@/types';

const crearItem = (sobrescribir: Partial<ICarritoItem> = {}): ICarritoItem => ({
  productoId: 1,
  varianteId: 1,
  cantidad: 1,
  precio: 50000,
  nombre: 'Camiseta',
  imagen: '/img.jpg',
  ...sobrescribir,
});

beforeEach(() => {
  localStorage.clear();
});

describe('obtenerCarrito', () => {
  it('debe retornar un arreglo vacío cuando no hay items guardados', () => {
    const carrito = obtenerCarrito();

    expect(carrito).toEqual([]);
  });
});

describe('agregarItem', () => {
  it('debe agregar un item nuevo al carrito', () => {
    const item = crearItem();

    agregarItem(item);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(1);
    expect(carrito[0]).toEqual(item);
  });

  it('debe aumentar cantidad si el item ya existe', () => {
    const item = crearItem();

    agregarItem(item);
    agregarItem(item);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it('debe mantener items distintos como entradas separadas', () => {
    const itemA = crearItem();
    const itemB = crearItem({ productoId: 2, varianteId: 2, nombre: 'Gorra' });

    agregarItem(itemA);
    agregarItem(itemB);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(2);
  });
});

describe('quitarItem', () => {
  it('debe remover el item que coincida con productoId y varianteId', () => {
    const itemA = crearItem();
    const itemB = crearItem({ productoId: 2, varianteId: 2, nombre: 'Gorra' });

    agregarItem(itemA);
    agregarItem(itemB);
    quitarItem(itemA.productoId, itemA.varianteId);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(1);
    expect(carrito[0].productoId).toBe(itemB.productoId);
  });
});

describe('actualizarCantidad', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe actualizar la cantidad de un item existente', () => {
    const item = crearItem({ cantidad: 1 });

    agregarItem(item);
    actualizarCantidad(item.productoId, item.varianteId, 5);
    const carrito = obtenerCarrito();

    expect(carrito[0].cantidad).toBe(5);
  });

  it('debe remover el item si la cantidad es menor o igual a cero', () => {
    const item = crearItem();

    agregarItem(item);
    actualizarCantidad(item.productoId, item.varianteId, 0);
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(0);
  });
});

describe('limpiarCarrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe remover todos los items del carrito', () => {
    agregarItem(crearItem());

    limpiarCarrito();
    const carrito = obtenerCarrito();

    expect(carrito).toHaveLength(0);
  });
});

describe('calcularTotalCarrito', () => {
  it('debe calcular el total multiplicando precio por cantidad y sumando', () => {
    const carrito = [
      crearItem({ productoId: 1, varianteId: 1, precio: 50000, cantidad: 2 }),
      crearItem({ productoId: 2, varianteId: 2, precio: 30000, cantidad: 1 }),
    ];

    const total = calcularTotalCarrito(carrito);

    expect(total).toBe(130000);
  });

  it('debe retornar cero para un carrito vacío', () => {
    const total = calcularTotalCarrito([]);

    expect(total).toBe(0);
  });
});
