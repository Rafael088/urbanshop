import { esColorClaro, obtenerHexColor } from '@/lib/colores';

interface VariantSelectorProps {
  etiqueta: string;
  /** Texto alineado a la derecha del label (p. ej. "Negro", "Seleccionada · M") */
  valor: string;
  opciones: string[];
  seleccion: string | null;
  agotadas?: string[];
  onSeleccionar: (opcion: string) => void;
  mostrarSwatches?: boolean;
}

function claseOpcion(activa: boolean, agotada: boolean, conSwatch: boolean): string {
  const base =
    'flex h-14 items-center gap-2 rounded-none border font-mono text-xs font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prensa';
  const forma = conSwatch ? 'px-5' : 'w-14 justify-center p-0';

  if (agotada) return `${base} ${forma} cursor-not-allowed border-surco bg-carton text-[#9a917e]`;
  if (activa) return `${base} ${forma} border-tinta bg-tinta text-papel`;
  return `${base} ${forma} border-tinta bg-transparent text-tinta hover:bg-tinta hover:text-papel`;
}

export function VariantSelector({
  etiqueta,
  valor,
  opciones,
  seleccion,
  agotadas = [],
  onSeleccionar,
  mostrarSwatches = false,
}: VariantSelectorProps) {
  // Un solo valor significa que el producto no ofrece variación en este campo
  if (opciones.length === 0) return null;

  return (
    <div role="group" aria-label={etiqueta}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-tinta-suave">
          {etiqueta}
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-tinta">
          {valor}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opcion) => {
          const activa = seleccion === opcion;
          const agotada = agotadas.includes(opcion);

          return (
            <button
              key={opcion}
              type="button"
              onClick={() => onSeleccionar(opcion)}
              disabled={agotada}
              aria-pressed={activa}
              title={agotada ? 'Sin existencias en este color' : undefined}
              className={claseOpcion(activa, agotada, mostrarSwatches)}
            >
              {mostrarSwatches && (
                <span
                  aria-hidden="true"
                  className={`h-4 w-4 rounded-full border ${
                    esColorClaro(opcion) ? 'border-tinta-suave' : 'border-surco'
                  }`}
                  style={{ backgroundColor: obtenerHexColor(opcion) }}
                />
              )}
              <span className={agotada ? 'line-through' : undefined}>{opcion}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
