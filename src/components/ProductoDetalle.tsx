'use client';

import { FichaProducto } from '@/components/FichaProducto';
import { MensajeEstado } from '@/components/MensajeEstado';
import { MigasPan } from '@/components/MigasPan';
import { useProducto } from '@/hooks/useProducto';
import { useSeleccionProducto } from '@/hooks/useSeleccionProducto';

interface ProductoDetalleProps {
  productoId: number;
}

function EsqueletoFicha() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14" aria-busy="true">
      <div className="aspect-square animate-pulse bg-carton" />
      <div className="flex flex-col gap-4">
        <div className="h-10 w-40 animate-pulse bg-carton" />
        <div className="h-1 w-full animate-pulse bg-surco" />
        <div className="h-16 w-3/4 animate-pulse bg-carton" />
        <div className="h-14 w-full animate-pulse bg-carton" />
      </div>
      <span className="sr-only">Cargando producto…</span>
    </div>
  );
}

export function ProductoDetalle({ productoId }: ProductoDetalleProps) {
  const { producto, estado } = useProducto(productoId);
  const seleccion = useSeleccionProducto(producto);

  if (estado === 'cargando') return <EsqueletoFicha />;

  if (!producto) {
    return (
      <MensajeEstado
        titulo={estado === 'error' ? 'No pudimos cargar el producto' : 'Producto no encontrado'}
      />
    );
  }

  return (
    <>
      <MigasPan categoria={producto.categoria.nombre} producto={producto.nombre} />
      <FichaProducto
        producto={producto}
        variante={seleccion.variante}
        talla={seleccion.talla}
        color={seleccion.color}
        cantidad={seleccion.cantidad}
        agregado={seleccion.agregado}
        onTalla={seleccion.onTalla}
        onColor={seleccion.onColor}
        onCantidad={seleccion.onCantidad}
        onAgregar={seleccion.onAgregar}
      />
    </>
  );
}
