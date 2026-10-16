import { EncabezadoProducto } from '@/components/EncabezadoProducto';
import { GaleriaProducto } from '@/components/GaleriaProducto';
import { SelectorCompra } from '@/components/SelectorCompra';
import type { IProducto, IVariante } from '@/types';

interface FichaProductoProps {
  producto: IProducto;
  variante: IVariante | undefined;
  talla: string | null;
  color: string | null;
  cantidad: number;
  agregado: boolean;
  onTalla: (valor: string) => void;
  onColor: (valor: string) => void;
  onCantidad: (valor: number) => void;
  onAgregar: () => void;
}

export function FichaProducto(props: FichaProductoProps) {
  const { producto, ...compra } = props;

  return (
    <article className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <GaleriaProducto producto={producto} />

      <div className="flex flex-col">
        <EncabezadoProducto producto={producto} />
        <SelectorCompra producto={producto} {...compra} />

        <section className="mt-10 border-t border-surco pt-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-tinta">
            La ficha
          </h2>
          <p className="mt-4 max-w-[65ch] text-[17px] leading-[1.65] text-tinta">
            {producto.descripcion}
          </p>
        </section>
      </div>
    </article>
  );
}
