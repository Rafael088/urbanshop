import type { IProducto } from '@/types';
import { ProductCard } from '@/components/ProductCard';

interface ProductGridProps {
  productos: IProducto[];
}

export function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
