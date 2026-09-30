import Image from 'next/image';
import Link from 'next/link';

import type { IProducto } from '@/types';
import { formatearPrecio } from '@/lib/format';

interface ProductCardProps {
  producto: IProducto;
}

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <Link href={`/productos/${producto.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <Image
          src={producto.imagenes[0] ?? 'https://placehold.co/600x800/png?text=Sin+imagen'}
          alt={producto.nombre}
          width={600}
          height={800}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-gray-600 text-sm mt-1">{formatearPrecio(producto.precio)}</p>
          <div className="flex gap-2 mt-2">
            {producto.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
