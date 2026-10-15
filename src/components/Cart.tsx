'use client';

import Link from 'next/link';

import { CartItem } from '@/components/CartItem';
import { CartResumen } from '@/components/CartResumen';
import { useCarrito } from '@/hooks/useCarrito';
import { actualizarCantidad, limpiarCarrito, quitarItem } from '@/lib/cart';

export function Cart() {
  const items = useCarrito();

  const manejarCantidad = (productoId: number, varianteId: number, cantidad: number): void => {
    actualizarCantidad(productoId, varianteId, cantidad);
  };

  const manejarQuitar = (productoId: number, varianteId: number): void => {
    quitarItem(productoId, varianteId);
  };

  const manejarLimpiar = (): void => {
    limpiarCarrito();
  };

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Tu carrito está vacío</h2>
        <p className="mt-2 text-tinta-suave">Agrega productos desde el catálogo.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-tinta px-6 py-3 font-semibold text-papel transition-colors hover:bg-tinta-suave"
        >
          Ver el catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between border-b-2 border-tinta pb-3">
          <h2 className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
            {items.length} {items.length === 1 ? 'referencia' : 'referencias'}
          </h2>
          <button
            type="button"
            onClick={manejarLimpiar}
            className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase underline transition-colors hover:text-prensa"
          >
            Vaciar carrito
          </button>
        </div>

        <ul>
          {items.map((item) => (
            <CartItem
              key={`${item.productoId}-${item.varianteId}`}
              item={item}
              onCantidad={manejarCantidad}
              onQuitar={manejarQuitar}
            />
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block border border-tinta px-6 py-3 font-semibold text-tinta transition-colors hover:bg-tinta hover:text-papel"
          >
            Seguir comprando
          </Link>
        </div>
      </div>

      <CartResumen items={items} />
    </div>
  );
}
