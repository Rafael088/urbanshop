const CLASE_BOTON =
  'flex w-12 items-center justify-center bg-transparent text-tinta transition-colors hover:bg-tinta hover:text-papel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prensa disabled:cursor-not-allowed disabled:text-surco disabled:hover:bg-transparent disabled:hover:text-surco';

interface SelectorCantidadProps {
  cantidad: number;
  maximo: number;
  onCantidad: (valor: number) => void;
}

export function SelectorCantidad({ cantidad, maximo, onCantidad }: SelectorCantidadProps) {
  const limite = Math.max(maximo, 1);

  return (
    <div className="flex min-h-14 items-stretch border border-tinta">
      <button
        type="button"
        aria-label="Restar una unidad"
        disabled={cantidad <= 1}
        onClick={() => onCantidad(cantidad - 1)}
        className={`${CLASE_BOTON} border-r border-tinta`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <path d="M2 7h10" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <output
        aria-live="polite"
        className="flex w-12 items-center justify-center font-mono text-sm font-bold tabular-nums"
      >
        {cantidad}
      </output>
      <button
        type="button"
        aria-label="Sumar una unidad"
        disabled={cantidad >= limite}
        onClick={() => onCantidad(cantidad + 1)}
        className={`${CLASE_BOTON} border-l border-tinta`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
