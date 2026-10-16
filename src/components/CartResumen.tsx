'use client';

import Link from 'next/link';

import type { ICarritoItem } from '@/types';
import { formatearPrecio } from '@/lib/format';
import { calcularTotales } from '@/lib/checkout';
import { UMBRAL_ENVIO_GRATIS } from '@/lib/envio';

interface CartResumenProps {
  items: ICarritoItem[];
  // En /checkout la acción de pago vive dentro del formulario, no aquí
  mostrarAccion?: boolean;
}

export function CartResumen({ items, mostrarAccion = true }: CartResumenProps) {
  const { subtotal, envio, total } = calcularTotales(items);

  return (
    <aside className="border border-tinta bg-carton/40 p-6">
      <h2 className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
        Resumen del pedido
      </h2>

      <dl className="mt-4 flex flex-col gap-2 font-mono text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatearPrecio(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Envío</dt>
          <dd>{envio === 0 ? 'Gratis' : formatearPrecio(envio)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-tinta pt-4">
        <span className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
          Total
        </span>
        <span className="text-2xl font-black">{formatearPrecio(total)}</span>
      </div>

      {envio > 0 && (
        <p className="mt-3 font-mono text-xs text-tinta-suave">
          Envío gratis desde {formatearPrecio(UMBRAL_ENVIO_GRATIS)}
        </p>
      )}

      {mostrarAccion && (
        <Link
          href="/checkout"
          className="mt-6 block w-full bg-tinta px-6 py-3 text-center font-semibold text-papel transition-colors hover:bg-tinta-suave"
        >
          Ir a pagar
        </Link>
      )}

      <p className="mt-3 text-center font-mono text-xs text-tinta-suave">
        Pago seguro con Mercado Pago
      </p>
    </aside>
  );
}
