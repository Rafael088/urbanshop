'use client';

import { useEffect, useState } from 'react';

import type { IProducto } from '@/types';

type EstadoProducto = 'cargando' | 'listo' | 'no-encontrado' | 'error';

interface IUseProducto {
  producto: IProducto | null;
  estado: EstadoProducto;
}

/**
 * Trae un producto por id desde GET /api/productos/[id] (un solo registro,
 * no el catálogo entero). El carrito vive en localStorage, así que este
 * detalle es 100% cliente.
 */
export function useProducto(productoId: number): IUseProducto {
  const [producto, setProducto] = useState<IProducto | null>(null);
  const [estado, setEstado] = useState<EstadoProducto>('cargando');

  useEffect(() => {
    let vigente = true;

    const cargar = async () => {
      setEstado('cargando');
      try {
        const respuesta = await fetch(`/api/productos/${productoId}`);
        const cuerpo: { data: IProducto | null; error: string | null } = await respuesta.json();

        if (!vigente) return;

        if (respuesta.status === 404) {
          setEstado('no-encontrado');
          return;
        }

        const productoApi = cuerpo.data;

        // Defensa: si la API devuelve algo que no es un registro con sus
        // variantes, la ficha no tiene nada que vender y no debe reventar.
        if (!productoApi || !Array.isArray(productoApi.variantes)) {
          setEstado(respuesta.ok ? 'no-encontrado' : 'error');
          return;
        }

        setProducto(productoApi);
        setEstado('listo');
      } catch {
        if (vigente) setEstado('error');
      }
    };

    cargar();

    return () => {
      vigente = false;
    };
  }, [productoId]);

  return { producto, estado };
}
