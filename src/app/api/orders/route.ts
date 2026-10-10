import { NextResponse } from 'next/server';
import { z } from 'zod';

import type { IApiResponse, IOrden, IOrdenItem } from '@/types';
import { prisma } from '@/lib/prisma';

const ordenItemSchema = z.object({
  productoId: z.number().int().positive(),
  varianteId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  precio: z.number().positive(),
});

const crearOrdenSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(1, 'El teléfono es requerido').max(20),
  direccion: z.string().min(1, 'La dirección es requerida').max(200),
  ciudad: z.string().min(1, 'La ciudad es requerida').max(100),
  departamento: z.string().min(1, 'El departamento es requerido').max(100),
  codigoPostal: z.string().max(20).optional(),
  items: z.array(ordenItemSchema).min(1, 'La orden debe tener al menos un item'),
});

function calcularTotalOrden(items: IOrdenItem[]): number {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

async function crearOrdenEnDB(ordenData: IOrden, total: number) {
  return prisma.$transaction(async (tx) => {
    return tx.orden.create({
      data: {
        nombre: ordenData.nombre,
        email: ordenData.email,
        telefono: ordenData.telefono,
        direccion: ordenData.direccion,
        ciudad: ordenData.ciudad,
        departamento: ordenData.departamento,
        codigoPostal: ordenData.codigoPostal ?? null,
        total,
        items: {
          create: ordenData.items.map((item) => ({
            productoId: item.productoId,
            varianteId: item.varianteId,
            cantidad: item.cantidad,
            precio: item.precio,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  });
}

function respuestaError(mensaje: string, detalle?: string) {
  return NextResponse.json<IApiResponse<null>>(
    { data: null, error: detalle ?? mensaje, message: mensaje },
    { status: 400 }
  );
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const validacion = crearOrdenSchema.safeParse(body);
    if (!validacion.success) {
      return respuestaError('Datos inválidos', validacion.error.errors[0].message);
    }

    const ordenData = validacion.data as IOrden;
    const total = calcularTotalOrden(ordenData.items);
    const orden = await crearOrdenEnDB(ordenData, total);

    return NextResponse.json<IApiResponse<typeof orden>>({
      data: orden,
      error: null,
      message: 'Orden creada exitosamente',
    });
  } catch (error) {
    console.error('Error al crear orden:', error);
    return NextResponse.json<IApiResponse<null>>(
      { data: null, error: 'Error al crear la orden', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}
