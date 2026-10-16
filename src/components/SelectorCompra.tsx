import Link from 'next/link';

import { SelectorCantidad } from '@/components/SelectorCantidad';
import { TramaStock } from '@/components/TramaStock';
import { VariantSelector } from '@/components/VariantSelector';
import { opcionesDe, stockMaximo, tallasAgotadas } from '@/lib/catalogo';
import type { IProducto, IVariante } from '@/types';

interface SelectorCompraProps {
  producto: IProducto;
  variante: IVariante | undefined;
  talla: string | null;
  color: string | null;
  cantidad: number;
  agregado: boolean;
  onTalla: (valor: string) => void;
  onColor: (valor: string) => void;
  onCantidad: (valor: number) => void;
  onAgregar: () => void;
}

const CLASE_CTA =
  'flex-1 rounded-none border border-prensa bg-prensa px-7 py-[18px] font-mono text-xs font-bold uppercase tracking-[0.14em] text-papel transition-colors hover:bg-[#a83424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta disabled:cursor-not-allowed disabled:border-surco disabled:bg-carton disabled:text-[#9a917e]';

export function SelectorCompra({
  producto,
  variante,
  talla,
  color,
  cantidad,
  agregado,
  onTalla,
  onColor,
  onCantidad,
  onAgregar,
}: SelectorCompraProps) {
  const agotadas = tallasAgotadas(producto.variantes, color);

  return (
    <div className="mt-8 flex flex-col gap-6">
      <VariantSelector
        etiqueta="Color"
        valor={color ?? 'Elige uno'}
        opciones={opcionesDe(producto.variantes, 'color')}
        seleccion={color}
        onSeleccionar={onColor}
        mostrarSwatches
      />
      <VariantSelector
        etiqueta="Talla"
        valor={talla ? `Seleccionada · ${talla}` : 'Elige una'}
        opciones={opcionesDe(producto.variantes, 'talla')}
        seleccion={talla}
        agotadas={agotadas}
        onSeleccionar={onTalla}
      />

      {/* Sin variante elegida no hay nada que informar: se deja el hueco para
          la trama en cuanto el visitante pique color y talla. */}
      {variante && (
        <div>
          <TramaStock unidades={variante.stock} maximo={stockMaximo(producto.variantes)} />
          <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.14em]">
            <span className="text-tinta-suave">
              En esta variante: {variante.stock} de {stockMaximo(producto.variantes)} unidades
            </span>
            {variante.stock === 0 && <span className="text-prensa"> · Agotada</span>}
            {agotadas.length > 0 && (
              <span className="text-prensa">
                {' · '}
                {agotadas.join(' ')} agotada{agotadas.length > 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
      )}

      <div>
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-tinta-suave">
          Cantidad
        </p>
        <div className="flex gap-3">
          <SelectorCantidad
            cantidad={cantidad}
            maximo={variante?.stock ?? 1}
            onCantidad={onCantidad}
          />
          <button
            type="button"
            onClick={onAgregar}
            disabled={!variante || variante.stock === 0}
            className={CLASE_CTA}
          >
            {variante && variante.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>
        {!variante && (
          <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-tinta-suave">
            Elige talla y color para desbloquear
          </p>
        )}
        {agregado && variante && (
          <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-cara-b">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M2 7.5 5.5 11 12 3.5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Agregado al carrito
            <Link
              href="/carrito"
              className="underline underline-offset-4 transition-colors hover:text-tinta"
            >
              Ver carrito
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
