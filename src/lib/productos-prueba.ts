import type { ICategoria, IProducto, IVariante } from '@/types';

// Datos de prueba para poder ver la interfaz sin base de datos.
// Se usan solo como fallback en la API cuando DATABASE_URL no está disponible.

const CATEGORIAS: Record<string, ICategoria> = {
  Camisetas: { id: 1, nombre: 'Camisetas', descripcion: 'Camisetas y t-shirts urbanas' },
  Pantalones: { id: 2, nombre: 'Pantalones', descripcion: 'Joggers, cargos y jeans' },
  Accesorios: { id: 3, nombre: 'Accesorios', descripcion: 'Bolsos, medias y más' },
  Gorras: { id: 4, nombre: 'Gorras', descripcion: 'Gorras y beanies' },
};

interface ProductoPrueba {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: keyof typeof CATEGORIAS;
  tags: string[];
  tallas: (string | null)[];
  colores: string[];
}

const PRODUCTOS: ProductoPrueba[] = [
  { nombre: 'Camiseta Oversize Básica', descripcion: 'Algodón 100%, corte oversize.', precio: 59900, categoria: 'Camisetas', tags: ['oversize', 'algodón'], tallas: ['S', 'M', 'L', 'XL'], colores: ['Negro', 'Blanco'] },
  { nombre: 'Camiseta Estampada Ciudad', descripcion: 'Estampado frontal inspirado en la calle.', precio: 69900, categoria: 'Camisetas', tags: ['estampado', 'nuevo'], tallas: ['S', 'M', 'L', 'XL'], colores: ['Negro', 'Gris'] },
  { nombre: 'Jogger Cargo', descripcion: 'Jogger con bolsillos laterales y puño elástico.', precio: 119900, categoria: 'Pantalones', tags: ['cargo', 'jogger'], tallas: ['S', 'M', 'L', 'XL'], colores: ['Negro', 'Verde oliva'] },
  { nombre: 'Jean Baggy', descripcion: 'Denim rígido de bota ancha.', precio: 149900, categoria: 'Pantalones', tags: ['denim', 'baggy'], tallas: ['S', 'M', 'L', 'XL'], colores: ['Azul'] },
  { nombre: 'Riñonera Urbana', descripcion: 'Riñonera impermeable con correa ajustable.', precio: 79900, categoria: 'Accesorios', tags: ['impermeable'], tallas: [null], colores: ['Negro', 'Beige'] },
  { nombre: 'Pack Medias Deportivas', descripcion: 'Pack x3 medias caña alta.', precio: 39900, categoria: 'Accesorios', tags: ['pack', 'deportivo'], tallas: [null], colores: ['Blanco', 'Negro'] },
  { nombre: 'Gorra Snapback Logo', descripcion: 'Snapback con logo bordado.', precio: 64900, categoria: 'Gorras', tags: ['snapback', 'bordado'], tallas: [null], colores: ['Negro', 'Rojo'] },
  { nombre: 'Beanie Tejido', descripcion: 'Gorro tejido doble capa.', precio: 44900, categoria: 'Gorras', tags: ['invierno'], tallas: [null], colores: ['Gris', 'Negro'] },
];

function crearSku(nombre: string, talla: string | null, color: string): string {
  const base = nombre.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 20);
  const colorCorto = color.toUpperCase().replace(/\s+/g, '').slice(0, 4);
  return [base, talla ?? 'UNICA', colorCorto].join('-');
}

function crearVariantes(id: number, producto: ProductoPrueba): IVariante[] {
  let secuencia = 0;
  return producto.tallas.flatMap((talla) =>
    producto.colores.map((color) => ({
      id: id * 100 + secuencia++,
      sku: crearSku(producto.nombre, talla, color),
      talla,
      color,
      stock: 10,
    }))
  );
}

export const PRODUCTOS_PRUEBA: IProducto[] = PRODUCTOS.map((producto, index) => ({
  id: index + 1,
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: producto.precio,
  tags: producto.tags,
  imagenes: [
    `https://placehold.co/600x800/png?text=${encodeURIComponent(producto.nombre)}`,
  ],
  categoria: CATEGORIAS[producto.categoria],
  variantes: crearVariantes(index + 1, producto),
}));
