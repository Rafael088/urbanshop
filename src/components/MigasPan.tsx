import Link from 'next/link';

interface MigasPanProps {
  categoria: string;
  producto: string;
}

// Por qué no enlazo la categoría: / no filtra todavía, y un enlace que muestre
// el catálogo completo bajo el nombre de la categoría engaña más que ayuda.
export function MigasPan({ categoria, producto }: MigasPanProps) {
  return (
    <nav aria-label="Migas de pan" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-bold uppercase tracking-[0.14em]">
        <li>
          <Link
            href="/"
            className="text-tinta-suave underline-offset-4 transition-colors hover:text-tinta hover:underline"
          >
            Todo
          </Link>
        </li>
        <li aria-hidden="true" className="text-tinta-suave">
          /
        </li>
        <li className="text-tinta-suave">{categoria}</li>
        <li aria-hidden="true" className="text-tinta-suave">
          /
        </li>
        <li aria-current="page" className="text-tinta">
          {producto}
        </li>
      </ol>
    </nav>
  );
}
