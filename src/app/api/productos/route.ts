import { NextResponse } from 'next/server';

import type { IApiResponse, IProducto } from '@/types';
import { prisma } from '@/lib/prisma';
import { PRODUCTOS_PRUEBA } from '@/lib/productos-prueba';

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        variantes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<IApiResponse<IProducto[]>>({
      data: productos,
      error: null,
      message: 'Productos obtenidos',
    });
  } catch (error) {
    // Sin base de datos disponible se sirven datos de prueba para poder ver la interfaz.
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<IApiResponse<IProducto[]>>({
        data: PRODUCTOS_PRUEBA,
        error: null,
        message: 'Datos de prueba (sin conexión a base de datos)',
      });
    }
    console.error('Error al obtener productos:', error);
    return NextResponse.json<IApiResponse<IProducto[]>>(
      { data: null, error: 'Error al obtener productos', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}
