import { NextResponse } from 'next/server';

import type { IApiResponse, IProducto } from '@/types';
import { prisma } from '@/lib/prisma';

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
    console.error('Error al obtener productos:', error);
    return NextResponse.json<IApiResponse<IProducto[]>>(
      { data: null, error: 'Error al obtener productos', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}
