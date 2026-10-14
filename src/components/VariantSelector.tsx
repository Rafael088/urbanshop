import { esColorClaro, obtenerHexColor } from '@/lib/colores';

interface VariantSelectorProps {
  etiqueta: string;
  opciones: string[];
  seleccion: string | null;
  onSeleccionar: (opcion: string) => void;
  // Cuando es true, cada opción se pinta con su color real (swatch circular)
  mostrarSwatches?: boolean;
}

export function VariantSelector({
  etiqueta,
  opciones,
  seleccion,
  onSeleccionar,
  mostrarSwatches = false,
}: VariantSelectorProps) {
  // Sin opciones no hay nada que elegir en este campo
  if (opciones.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">{etiqueta}</p>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opcion) => {
          const activa = seleccion === opcion;

          if (mostrarSwatches) {
            return (
              <button
                key={opcion}
                type="button"
                onClick={() => onSeleccionar(opcion)}
                aria-pressed={activa}
                title={opcion}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  activa ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <span
                  className={`h-6 w-6 rounded-full ${
                    esColorClaro(opcion) ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: obtenerHexColor(opcion) }}
                />
              </button>
            );
          }

          return (
            <button
              key={opcion}
              type="button"
              onClick={() => onSeleccionar(opcion)}
              aria-pressed={activa}
              className={`rounded border px-4 py-2 text-sm transition-colors ${
                activa
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </div>
  );
}
