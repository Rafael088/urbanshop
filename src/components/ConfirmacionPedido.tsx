'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { limpiarCarrito } from '@/lib/cart';

interface ConfirmacionPedidoProps {
  estado: string | null;
  idPago: string | null;
}

type Ton = 'ok' | 'pendiente' | 'error';

interface IContenido {
  titulo: string;
  mensaje: string;
  tono: Ton;
}

const CONTENIDOS: Record<string, IContenido> = {
  approved: {
    titulo: '¡Pago aprobado!',
    mensaje: 'Tu pedido fue confirmado y ya lo estamos preparando.',
    tono: 'ok',
  },
  pending: {
    titulo: 'Pago en revisión',
    mensaje: 'Mercado Pago está verificando tu pago. Te avisaremos cuando se confirme.',
    tono: 'pendiente',
  },
  in_process: {
    titulo: 'Pago en revisión',
    mensaje: 'Mercado Pago está verificando tu pago. Te avisaremos cuando se confirme.',
    tono: 'pendiente',
  },
  rejected: {
    titulo: 'Pago rechazado',
    mensaje: 'Tu pago no fue aprobado. Puedes intentarlo de nuevo desde el carrito.',
    tono: 'error',
  },
};

const SIN_ESTADO: IContenido = {
  titulo: 'Recibimos tu solicitud',
  mensaje: 'Te contactaremos por correo cuando el pago se confirme.',
  tono: 'pendiente',
};

const TONOS: Record<Ton, string> = {
  ok: 'text-ok',
  pendiente: 'text-tinta',
  error: 'text-prensa',
};

export function ConfirmacionPedido({ estado, idPago }: ConfirmacionPedidoProps) {
  // Por qué: el carrito solo se vacía con el pago aprobado; si está pendiente
  // o rechazado el usuario conserva sus productos para reintentar.
  useEffect(() => {
    if (estado === 'approved') limpiarCarrito();
  }, [estado]);

  const contenido = (estado && CONTENIDOS[estado]) || SIN_ESTADO;

  return (
    <div className="mx-auto max-w-xl border border-tinta bg-carton/40 p-8 text-center">
      <p className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
        Confirmación de pedido
      </p>
      <h1 className={`mt-3 text-3xl font-black md:text-4xl ${TONOS[contenido.tono]}`}>
        {contenido.titulo}
      </h1>
      <p className="mt-3 text-tinta-suave">{contenido.mensaje}</p>

      {idPago && (
        <p className="mt-4 font-mono text-xs text-tinta-suave">
          Referencia de pago: {idPago}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="bg-tinta px-6 py-3 font-semibold text-papel transition-colors hover:bg-tinta-suave"
        >
          Seguir comprando
        </Link>
        <Link
          href="/carrito"
          className="border border-tinta px-6 py-3 font-semibold text-tinta transition-colors hover:bg-tinta hover:text-papel"
        >
          Volver al carrito
        </Link>
      </div>
    </div>
  );
}
