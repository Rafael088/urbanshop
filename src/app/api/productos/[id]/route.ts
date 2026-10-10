import { NextResponse } from 'next/server';

import type { IApiResponse, IProducto } from '@/types';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/productos/[id]'>
) {
  try {
    const { id: rawId } = await ctx.params;
    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json<IApiResponse<null>>(
        { data: null, error: 'ID de producto inválido', message: 'El ID debe ser un número entero positivo' },
        { status: 400 }
      );
    }

    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        variantes: true,
      },
    });

    if (!producto) {
      return NextResponse.json<IApiResponse<null>>(
        { data: null, error: 'Producto no encontrado', message: `No existe un producto con ID ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json<IApiResponse<IProducto>>({
      data: producto,
      error: null,
      message: 'Producto obtenido',
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return NextResponse.json<IApiResponse<null>>(
      { data: null, error: 'Error al obtener producto', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}
