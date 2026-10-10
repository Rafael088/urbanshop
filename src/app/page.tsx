import type { Metadata } from 'next';

import { ProductGrid } from '@/components/ProductGrid';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { obtenerProductos } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Urbanshop · Ropa y accesorios urbanos',
};

export default async function Home() {
  const productos = await obtenerProductos();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-papel text-tinta">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
          <div className="mb-8 flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
              Catálogo Urbanshop
            </p>
            <h1 className="text-4xl font-black md:text-5xl">La batea completa</h1>
            <p className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
              Mostrando {productos.length} referencias · Orden: novedad ↓
            </p>
          </div>
          <ProductGrid productos={productos} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
