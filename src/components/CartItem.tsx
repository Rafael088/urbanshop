'use client';

import Image from 'next/image';

import type { ICarritoItem } from '@/types';
import { formatearPrecio } from '@/lib/format';

interface CartItemProps {
  item: ICarritoItem;
  onCantidad: (productoId: number, varianteId: number, cantidad: number) => void;
  onQuitar: (productoId: number, varianteId: number) => void;
}

function describirVariante(item: ICarritoItem): string {
  return [item.talla, item.color].filter(Boolean).join(' · ');
}

export function CartItem({ item, onCantidad, onQuitar }: CartItemProps) {
  const subtotal = item.precio * item.cantidad;

  return (
    <li className="flex gap-4 border-b border-surco py-5">
      <Image
        src={item.imagen}
        alt={item.nombre}
        width={96}
        height={96}
        className="h-24 w-20 shrink-0 border border-surco object-cover"
      />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{item.nombre}</h3>
            {describirVariante(item) && (
              <p className="mt-0.5 font-mono text-xs text-tinta-suave uppercase">
                {describirVariante(item)}
              </p>
            )}
            <p className="mt-1 font-mono text-xs text-tinta-suave">
              Unit: {formatearPrecio(item.precio)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onQuitar(item.productoId, item.varianteId)}
            aria-label={`Quitar ${item.nombre} del carrito`}
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-surco text-tinta-suave transition-colors hover:border-prensa hover:text-prensa"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-tinta">
            <button
              type="button"
              onClick={() => onCantidad(item.productoId, item.varianteId, item.cantidad - 1)}
              aria-label="Restar una unidad"
              className="px-3 py-1.5 font-mono transition-colors hover:bg-carton"
            >
              −
            </button>
            <span className="min-w-9 px-2 text-center font-mono text-sm">{item.cantidad}</span>
            <button
              type="button"
              onClick={() => onCantidad(item.productoId, item.varianteId, item.cantidad + 1)}
              aria-label="Sumar una unidad"
              className="px-3 py-1.5 font-mono transition-colors hover:bg-carton"
            >
              +
            </button>
          </div>

          <p className="font-mono font-bold">{formatearPrecio(subtotal)}</p>
        </div>
      </div>
    </li>
  );
}
