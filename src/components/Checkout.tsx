'use client';

import Link from 'next/link';
import { useState } from 'react';

import { CartResumen } from '@/components/CartResumen';
import { CheckoutForm } from '@/components/CheckoutForm';
import { useCarrito } from '@/hooks/useCarrito';
import type { IDatosEnvio } from '@/types';
import { construirOrden, iniciarPago } from '@/lib/checkout';

export function Checkout() {
  const items = useCarrito();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarPagar = async (datos: IDatosEnvio): Promise<void> => {
    setEnviando(true);
    setError(null);

    try {
      const url = await iniciarPago(construirOrden(datos, items));
      // Por qué: la preferencia vive en el dominio de Mercado Pago,
      // así que se navega con location y no con el router de Next.
      window.location.assign(url);
    } catch (errorDesconocido) {
      const mensaje =
        errorDesconocido instanceof Error
          ? errorDesconocido.message
          : 'No se pudo iniciar el pago. Intenta de nuevo.';
      setError(mensaje);
      setEnviando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Tu carrito está vacío</h2>
        <p className="mt-2 text-tinta-suave">Agrega productos antes de ir a pagar.</p>
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
    <div className="grid gap-10 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <h2 className="mb-4 font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
          Datos de envío
        </h2>
        <CheckoutForm onPagar={manejarPagar} enviando={enviando} />
        {error && (
          <p className="mt-4 border border-prensa px-4 py-3 text-sm text-prensa" role="alert">
            {error}
          </p>
        )}
      </section>

      <CartResumen items={items} mostrarAccion={false} />
    </div>
  );
}
