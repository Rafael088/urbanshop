import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

import type { IProducto } from '@/types';
import { IMAGEN_PLACEHOLDER } from '@/lib/imagenes';

// Por qué en CSS: DESIGN.md pide surcos radiales sutiles sobre el cartón
// (la cara de un vinilo) y el proyecto no tiene capa de textura propia.
const SURCOS: CSSProperties = {
  backgroundImage:
    'repeating-radial-gradient(circle at 50% 50%, rgba(27,26,23,.06) 0 1px, transparent 1px 9px)',
};

interface GaleriaProductoProps {
  producto: IProducto;
}

export function GaleriaProducto({ producto }: GaleriaProductoProps) {
  const imagenes = producto.imagenes.length > 0 ? producto.imagenes : [IMAGEN_PLACEHOLDER];
  const [activa, setActiva] = useState(0);
  const imagenActual = imagenes[activa] ?? imagenes[0] ?? IMAGEN_PLACEHOLDER;

  return (
    <div className="flex flex-col gap-4">
      {/* Por qué el margen: DESIGN.md define el sleeve como carátula *dentro*
          del cartón; a sangre completa los surcos nunca se verían. */}
      <figure className="border border-surco">
        <div className="relative aspect-square bg-carton p-[5%]" style={SURCOS}>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={imagenActual}
              alt={producto.nombre}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <figcaption className="flex items-center justify-between gap-4 bg-prensa px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-papel">
          <span>Lado A · 33⅓ RPM</span>
          <span className="text-right">
            {imagenes.length > 1 ? `Imagen ${activa + 1} de ${imagenes.length}` : 'Portada'}
          </span>
        </figcaption>
      </figure>

      {imagenes.length > 1 && (
        <ul className="flex gap-3">
          {imagenes.map((imagen, indice) => (
            <li key={imagen}>
              <button
                type="button"
                onClick={() => setActiva(indice)}
                aria-label={`Ver imagen ${indice + 1} de ${imagenes.length}`}
                aria-pressed={activa === indice}
                className={`relative block h-20 w-20 overflow-hidden border bg-carton transition-colors ${
                  activa === indice ? 'border-2 border-tinta' : 'border-surco hover:border-tinta'
                }`}
              >
                <Image src={imagen} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
