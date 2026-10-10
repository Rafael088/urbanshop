import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-tinta text-papel">
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
            className="border border-papel px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase transition-colors hover:bg-papel hover:text-tinta"
          >
            Carrito
          </Link>
        </nav>
      </div>
    </header>
  );
}
