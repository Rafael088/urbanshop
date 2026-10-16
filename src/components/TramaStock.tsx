import { clasificarStock, type NivelStock } from '@/lib/catalogo';

// Por qué así: DESIGN.md obliga a leer el stock como trama impresa a 45°,
// no como badge ni barra de progreso redondeada. La densidad es la información.
const TRAMAS: Record<NivelStock, string> = {
  lleno: 'repeating-linear-gradient(45deg, #1b1a17 0 3px, transparent 3px 6px)',
  tibio: 'repeating-linear-gradient(45deg, #1b1a17 0 3px, transparent 3px 11px)',
  ultima: 'repeating-linear-gradient(45deg, #1b1a17 0 2px, transparent 2px 16px)',
  vacio: 'repeating-linear-gradient(45deg, #cfc5ac 0 3px, transparent 3px 10px)',
};

interface TramaStockProps {
  unidades: number;
  maximo: number;
}

export function TramaStock({ unidades, maximo }: TramaStockProps) {
  const nivel = clasificarStock(unidades, maximo);

  return (
    <div
      aria-hidden="true"
      className="h-[10px] w-full border border-tinta bg-papel"
      style={{ backgroundImage: TRAMAS[nivel] }}
    />
  );
}
