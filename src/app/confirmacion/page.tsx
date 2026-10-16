import type { Metadata } from 'next';

import { ConfirmacionPedido } from '@/components/ConfirmacionPedido';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Confirmación · Urbanshop',
};

interface ConfirmacionPaginaProps {
  // En Next.js 16 searchParams es un Promise y debe resolverse con await.
  // Mercado Pago agrega ?status=...&payment_id=... al volver de la pasarela.
  searchParams: Promise<{ status?: string; payment_id?: string }>;
}

function primerValor(valor: string | string[] | undefined): string | null {
  if (Array.isArray(valor)) return valor[0] ?? null;
  return valor ?? null;
}

export default async function ConfirmacionPagina({ searchParams }: ConfirmacionPaginaProps) {
  const params = await searchParams;
  const estado = primerValor(params.status);
  const idPago = primerValor(params.payment_id);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-papel text-tinta">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
          <ConfirmacionPedido estado={estado} idPago={idPago} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
