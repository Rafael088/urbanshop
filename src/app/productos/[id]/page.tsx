import type { Metadata } from 'next';

import { ProductoDetalle } from '@/components/ProductoDetalle';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Producto · Urbanshop',
};

interface ProductoPaginaProps {
  // En Next.js 16 params es un Promise y debe resolverse con await
  params: Promise<{ id: string }>;
}

export default async function ProductoPagina({ params }: ProductoPaginaProps) {
  const { id } = await params;
  const productoId = Number(id);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-papel text-tinta caret-tinta [&::selection]:bg-prensa [&::selection]:text-papel">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-12">
          <ProductoDetalle key={productoId} productoId={productoId} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
