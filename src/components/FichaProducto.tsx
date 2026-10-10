import Image from 'next/image';

import { GrupoOpciones } from '@/components/GrupoOpciones';
import type { IProducto, IVariante } from '@/types';
import { formatearPrecio } from '@/lib/format';

export const IMAGEN_PLACEHOLDER = 'https://placehold.co/600x800/png?text=Sin+imagen';

interface FichaProductoProps {
  producto: IProducto;
  variante: IVariante | undefined;
  talla: string | null;
  color: string | null;
  agregado: boolean;
  onTalla: (valor: string) => void;
  onColor: (valor: string) => void;
  onAgregar: () => void;
}

function obtenerOpciones(variantes: IVariante[], campo: 'talla' | 'color'): string[] {
  const valores = variantes.map((variante) => variante[campo]);
  return [...new Set(valores.filter((valor): valor is string => Boolean(valor)))];
}

function ListaTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function FichaProducto({
  producto,
  variante,
  talla,
  color,
  agregado,
  onTalla,
  onColor,
  onAgregar,
}: FichaProductoProps) {
  const agotado = variante !== undefined && variante.stock === 0;

  return (
    <article className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
      <Image
        src={producto.imagenes[0] ?? IMAGEN_PLACEHOLDER}
        alt={producto.nombre}
        width={600}
        height={800}
        className="w-full rounded-lg border object-cover"
      />
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-500">{producto.categoria.nombre}</p>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <p className="mt-2 text-2xl text-gray-800">{formatearPrecio(producto.precio)}</p>
        </div>
        <p className="text-gray-600">{producto.descripcion}</p>
        <ListaTags tags={producto.tags} />
        <GrupoOpciones
          etiqueta="Talla"
          opciones={obtenerOpciones(producto.variantes, 'talla')}
          seleccion={talla}
          onSeleccionar={onTalla}
        />
        <GrupoOpciones
          etiqueta="Color"
          opciones={obtenerOpciones(producto.variantes, 'color')}
          seleccion={color}
          onSeleccionar={onColor}
        />
        {variante && (
          <p
            className={
              variante.stock > 0 ? 'text-sm text-gray-600' : 'text-sm font-medium text-red-600'
            }
          >
            {variante.stock > 0 ? `Existencias: ${variante.stock} unidades` : 'Agotado'}
          </p>
        )}
        <button
          type="button"
          onClick={onAgregar}
          disabled={!variante || agotado}
          className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {agotado ? 'Agotado' : 'Agregar al carrito'}
        </button>
        {agregado && variante && <p className="text-sm text-green-600">✓ Agregado al carrito</p>}
      </div>
    </article>
  );
}
