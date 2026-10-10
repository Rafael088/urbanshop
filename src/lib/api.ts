import { headers } from 'next/headers';

import type { IApiResponse, IProducto } from '@/types';

// Un Server Component no conoce su propio host: se arma desde la request actual.
async function obtenerOrigen(): Promise<string> {
  const encabezados = await headers();
  const protocolo = encabezados.get('x-forwarded-proto') ?? 'http';
  const host = encabezados.get('host') ?? 'localhost:3000';
  return `${protocolo}://${host}`;
}

export async function obtenerProductos(): Promise<IProducto[]> {
  try {
    const respuesta = await fetch(`${await obtenerOrigen()}/api/productos`, {
      cache: 'no-store',
    });

    if (!respuesta.ok) return [];

    const cuerpo = (await respuesta.json()) as IApiResponse<IProducto[]>;
    return cuerpo.data ?? [];
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}
