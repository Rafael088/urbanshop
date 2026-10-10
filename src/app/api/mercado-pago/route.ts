import { NextResponse } from 'next/server';
import { z } from 'zod';

import type { IApiResponse, IOrden } from '@/types';
import { prisma } from '@/lib/prisma';
import { crearPreferencia } from '@/lib/mercado-pago';

const itemSchema = z.object({
  productoId: z.number().int().positive(),
  varianteId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  precio: z.number().positive(),
});

const crearPreferenciaSchema = z.object({
  orden: z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(100),
    email: z.string().email('Email inválido'),
    telefono: z.string().min(1, 'El teléfono es requerido').max(20),
    direccion: z.string().min(1, 'La dirección es requerida').max(200),
    ciudad: z.string().min(1, 'La ciudad es requerida').max(100),
    departamento: z.string().min(1, 'El departamento es requerido').max(100),
    codigoPostal: z.string().max(20).optional(),
    items: z.array(itemSchema).min(1, 'La orden debe tener al menos un item'),
  }),
});

async function obtenerNombresProductos(orden: IOrden): Promise<Map<number, string>> {
  const productoIds = [...new Set(orden.items.map((item) => item.productoId))];
  const productos = await prisma.producto.findMany({
    where: { id: { in: productoIds } },
    select: { id: true, nombre: true },
  });
  return new Map(productos.map((p) => [p.id, p.nombre]));
}

async function generarPreferenciaMP(orden: IOrden) {
  const nombres = await obtenerNombresProductos(orden);
  const nombreProducto = nombres.get(orden.items[0].productoId) ?? 'Producto';
  return crearPreferencia(orden, nombreProducto);
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

    const validacion = crearPreferenciaSchema.safeParse(body);
    if (!validacion.success) {
      return respuestaError('Datos inválidos', validacion.error.errors[0].message);
    }

    const preferencia = await generarPreferenciaMP(validacion.data.orden);

    return NextResponse.json<IApiResponse<typeof preferencia>>({
      data: preferencia,
      error: null,
      message: 'Preferencia de pago creada exitosamente',
    });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json<IApiResponse<null>>(
      { data: null, error: 'Error al crear preferencia de pago', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}
