import type { Metadata } from 'next';

import { Cart } from '@/components/Cart';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Carrito · Urbanshop',
};

export default function CarritoPagina() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-papel text-tinta">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
          <div className="mb-8 flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase">
              Tu selección
            </p>
            <h1 className="text-4xl font-black md:text-5xl">Carrito</h1>
          </div>
          <Cart />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
