interface GrupoOpcionesProps {
  etiqueta: string;
  opciones: string[];
  seleccion: string | null;
  onSeleccionar: (opcion: string) => void;
}

export function GrupoOpciones({
  etiqueta,
  opciones,
  seleccion,
  onSeleccionar,
}: GrupoOpcionesProps) {
  // Un solo valor significa que el producto no ofrece variación en este campo
  if (opciones.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">{etiqueta}</p>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => onSeleccionar(opcion)}
            className={`rounded border px-4 py-2 text-sm transition-colors ${
              seleccion === opcion
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  );
}
