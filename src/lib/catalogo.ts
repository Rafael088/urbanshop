// Reglas puras de catálogo de la ficha de producto.
// Por qué vive en lib: son datos derivados de Prisma, sin React, para poder
// testearlos sin montar un componente.

import type { IVariante } from '@/types';

// El número de catálogo se deriva del id para no inventar un dato parecido a un SKU.
export function numeroCatalogo(productoId: number): string {
  return `CAT.${String(productoId).padStart(3, '0')}`;
}

// Opciones únicas de una dimensión (talla o color), sin vacíos.
export function opcionesDe(variantes: IVariante[], campo: 'talla' | 'color'): string[] {
  const valores = variantes.map((variante) => variante[campo]);
  return [...new Set(valores.filter((valor): valor is string => Boolean(valor)))];
}

// Sin opciones que elegir no hay variante que resolver: se toma la primera.
export function resolverVariante(
  variantes: IVariante[],
  campoTalla: string | null,
  campoColor: string | null
): IVariante | undefined {
  const hayOpciones = opcionesDe(variantes, 'talla').length > 0 || opcionesDe(variantes, 'color').length > 0;
  if (!hayOpciones) return variantes[0];
  return variantes.find(
    (variante) => (variante.talla ?? null) === campoTalla && (variante.color ?? null) === campoColor
  );
}

export type NivelStock = 'lleno' | 'tibio' | 'ultima' | 'vacio';

// Traduce unidades restantes a la densidad de la trama impresa de DESIGN.md.
export function clasificarStock(unidades: number, maximo: number): NivelStock {
  if (unidades <= 0) return 'vacio';
  const relacion = maximo > 0 ? unidades / maximo : 0;
  if (relacion >= 0.6) return 'lleno';
  if (relacion >= 0.25) return 'tibio';
  return 'ultima';
}

export function stockMaximo(variantes: IVariante[]): number {
  if (variantes.length === 0) return 0;
  return Math.max(...variantes.map((variante) => variante.stock));
}

// Tallas sin unidades en el color elegido. Sin color seleccionado no se avisa,
// porque sería decir "agotada" sin haber mirado ese color.
export function tallasAgotadas(variantes: IVariante[], color: string | null): string[] {
  if (color === null) return [];
  const tallas = opcionesDe(variantes, 'talla');
  return tallas.filter(
    (talla) =>
      !variantes.some(
        (variante) =>
          variante.talla === talla && variante.color === color && variante.stock > 0
      )
  );
}
