'use client';

import { useState } from 'react';

import type { ICarritoItem, IProducto, IVariante } from '@/types';
import { agregarItem } from '@/lib/cart';
import { resolverVariante } from '@/lib/catalogo';
import { IMAGEN_PLACEHOLDER } from '@/lib/imagenes';

interface SeleccionProducto {
  talla: string | null;
  color: string | null;
  cantidad: number;
  variante: IVariante | undefined;
  agregado: boolean;
  onTalla: (valor: string) => void;
  onColor: (valor: string) => void;
  onCantidad: (valor: number) => void;
  onAgregar: () => void;
}

function crearItemCarrito(
  producto: IProducto,
  variante: IVariante,
  cantidad: number
): ICarritoItem {
  return {
    productoId: producto.id,
    varianteId: variante.id,
    cantidad,
    precio: producto.precio,
    nombre: producto.nombre,
    imagen: producto.imagenes[0] ?? IMAGEN_PLACEHOLDER,
    talla: variante.talla ?? undefined,
    color: variante.color ?? undefined,
  };
}

// Por qué en un hook: AGENTS.md prohíbe lógica de negocio en los componentes,
// y así la página solo pinta. La selección se reinicia con key en la página.
export function useSeleccionProducto(producto: IProducto | null): SeleccionProducto {
  const [talla, setTalla] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const variante = producto ? resolverVariante(producto.variantes, talla, color) : undefined;

  // Nunca se vende más de lo que queda: el límite se aplica al cambiar de
  // variante (en el handler, no en un effect, para evitar renders en cascada).
  function limitarCantidad(nuevaTalla: string | null, nuevoColor: string | null): void {
    if (!producto) return;
    const siguiente = resolverVariante(producto.variantes, nuevaTalla, nuevoColor);
    if (siguiente && siguiente.stock > 0) {
      setCantidad((actual) => Math.min(actual, siguiente.stock));
    }
  }

  const onTalla = (valor: string): void => {
    setTalla(valor);
    setAgregado(false);
    limitarCantidad(valor, color);
  };

  const onColor = (valor: string): void => {
    setColor(valor);
    setAgregado(false);
    limitarCantidad(talla, valor);
  };

  const onCantidad = (valor: number): void => {
    setCantidad(valor);
    setAgregado(false);
  };

  const onAgregar = (): void => {
    if (!producto || !variante || variante.stock === 0) return;
    agregarItem(crearItemCarrito(producto, variante, cantidad));
    setAgregado(true);
  };

  return { talla, color, cantidad, variante, agregado, onTalla, onColor, onCantidad, onAgregar };
}
