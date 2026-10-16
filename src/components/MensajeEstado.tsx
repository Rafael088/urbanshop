import Link from 'next/link';

interface MensajeEstadoProps {
  titulo: string;
}

// Sin antetítulo sobre el título: la frase sola tiene que sostener el bloque.
export function MensajeEstado({ titulo }: MensajeEstadoProps) {
  return (
    <div className="mx-auto max-w-2xl border-2 border-tinta px-6 py-14 text-center">
      <h1 className="ancho-cartel text-[40px] font-black tracking-[-0.02em] leading-[0.95] text-balance">{titulo}</h1>
      <Link
        href="/"
        className="mt-8 inline-block rounded-none border border-tinta bg-transparent px-7 py-[18px] font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-tinta hover:text-papel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prensa"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
