'use client';

import Link from 'next/link';

import { useCarrito } from '@/hooks/useCarrito';

// Por qué: es 'use client' para poder usar useCarrito y mostrar el contador
// de items en el botón del carrito (localStorage solo existe en el cliente).
export function SiteHeader() {
  const items = useCarrito();
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <header className="sticky top-0 z-10 bg-barra text-barra-texto">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-10">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-[0.16em] uppercase"
        >
          Urbanshop
        </Link>
        <nav>
          <Link
            href="/carrito"
            aria-label={`Carrito con ${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'}`}
            className="border border-barra-texto px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase transition-colors hover:bg-barra-texto hover:text-barra"
          >
            Carrito{totalItems > 0 ? ` (${totalItems})` : ''}
          </Link>
        </nav>
      </div>
    </header>
  );
}
