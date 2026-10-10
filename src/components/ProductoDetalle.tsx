'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FichaProducto, IMAGEN_PLACEHOLDER } from '@/components/FichaProducto';
import type { IApiResponse, ICarritoItem, IProducto, IVariante } from '@/types';
import { agregarItem } from '@/lib/cart';

interface ProductoDetalleProps {
  productoId: number;
}

type EstadoCarga = 'cargando' | 'ok' | 'no-encontrado' | 'error';

function crearItemCarrito(producto: IProducto, variante: IVariante): ICarritoItem {
  return {
    productoId: producto.id,
    varianteId: variante.id,
    cantidad: 1,
    precio: producto.precio,
    nombre: producto.nombre,
    imagen: producto.imagenes[0] ?? IMAGEN_PLACEHOLDER,
    talla: variante.talla ?? undefined,
    color: variante.color ?? undefined,
  };
}

function MensajeEstado({ titulo }: { titulo: string }) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">{titulo}</h1>
      <Link href="/" className="mt-4 inline-block text-sm text-gray-600 underline">
        Volver a la tienda
      </Link>
    </div>
  );
}

export function ProductoDetalle({ productoId }: ProductoDetalleProps) {
  const [producto, setProducto] = useState<IProducto | null>(null);
  const [estado, setEstado] = useState<EstadoCarga>('cargando');
  const [talla, setTalla] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    let activo = true;

    // Por qué: GET /api/productos/[id] es tarea del backend y aún no existe,
    // así que el producto se busca dentro del listado que sí está disponible.
    async function cargarProducto(): Promise<void> {
      try {
        const respuesta = await fetch('/api/productos');
        if (!respuesta.ok) throw new Error('La respuesta falló');
        const json = (await respuesta.json()) as IApiResponse<IProducto[]>;
        if (!activo) return;
        const encontrado = json.data?.find((item) => item.id === productoId) ?? null;
        setProducto(encontrado);
        setEstado(encontrado ? 'ok' : 'no-encontrado');
      } catch {
        if (activo) setEstado('error');
      }
    }

    void cargarProducto();
    return () => {
      activo = false;
    };
  }, [productoId]);

  if (estado === 'cargando') {
    return <p className="py-16 text-center text-gray-500">Cargando producto…</p>;
  }

  if (!producto) {
    return (
      <MensajeEstado
        titulo={estado === 'error' ? 'No pudimos cargar el producto' : 'Producto no encontrado'}
      />
    );
  }

  const variante = producto.variantes.find(
    (item) => item.talla === talla && item.color === color
  );

  const manejarAgregar = (): void => {
    if (!variante) return;
    agregarItem(crearItemCarrito(producto, variante));
    setAgregado(true);
  };

  const seleccionarTalla = (valor: string): void => {
    setTalla(valor);
    setAgregado(false);
  };

  const seleccionarColor = (valor: string): void => {
    setColor(valor);
    setAgregado(false);
  };

  return (
    <FichaProducto
      producto={producto}
      variante={variante}
      talla={talla}
      color={color}
      agregado={agregado}
      onTalla={seleccionarTalla}
      onColor={seleccionarColor}
      onAgregar={manejarAgregar}
    />
  );
}
