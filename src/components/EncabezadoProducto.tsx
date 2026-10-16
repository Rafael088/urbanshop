import type { IProducto } from '@/types';
import { numeroCatalogo } from '@/lib/catalogo';
import { formatearPrecio } from '@/lib/format';

interface EncabezadoProductoProps {
  producto: IProducto;
}

export function EncabezadoProducto({ producto }: EncabezadoProductoProps) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-4 pb-4">
        <p className="font-mono text-3xl font-bold tabular-nums md:text-4xl">
          {formatearPrecio(producto.precio)}
        </p>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-tinta-suave">
          {numeroCatalogo(producto.id)} · COP
        </p>
      </div>

      <div className="border-t-2 border-tinta" />

      <h1 className="ancho-cartel mt-6 text-4xl font-extrabold tracking-[-0.02em] leading-[0.95] text-balance md:text-[40px]">
        {producto.nombre}
      </h1>

      {producto.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {producto.tags.map((tag) => (
            <li
              key={tag}
              className="border border-surco px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.14em] text-tinta-suave"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
