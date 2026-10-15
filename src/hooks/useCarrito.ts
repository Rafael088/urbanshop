'use client';

import { useSyncExternalStore } from 'react';

import type { ICarritoItem } from '@/types';
import { obtenerCarrito, suscribirCarrito } from '@/lib/cart';

// Por qué: useSyncExternalStore compara snapshots por referencia (Object.is).
// Si getSnapshot/getServerSnapshot devuelven un arreglo nuevo en cada render,
// React entra en bucle infinito. Por eso se cachean y solo se cambian si cambió el contenido.
const VACIO: ICarritoItem[] = [];

let cache: ICarritoItem[] = VACIO;
let cacheJson = '';

function leerSnapshot(): ICarritoItem[] {
  const carrito = obtenerCarrito();
  const json = JSON.stringify(carrito);

  if (json !== cacheJson) {
    cacheJson = json;
    cache = carrito;
  }

  return cache;
}

function leerSnapshotServidor(): ICarritoItem[] {
  return VACIO;
}

export function useCarrito(): ICarritoItem[] {
  return useSyncExternalStore(suscribirCarrito, leerSnapshot, leerSnapshotServidor);
}
