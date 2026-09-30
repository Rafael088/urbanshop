import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductoSemilla {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tags: string[];
  tallas: (string | null)[];
  colores: string[];
}

const CATEGORIAS = [
  { nombre: 'Camisetas', descripcion: 'Camisetas y t-shirts urbanas' },
  { nombre: 'Pantalones', descripcion: 'Joggers, cargos y jeans' },
  { nombre: 'Accesorios', descripcion: 'Bolsos, medias y más' },
  { nombre: 'Gorras', descripcion: 'Gorras y beanies' },
];

const TALLAS_ROPA = ['S', 'M', 'L', 'XL'];

const PRODUCTOS: ProductoSemilla[] = [
  { nombre: 'Camiseta Oversize Básica', descripcion: 'Algodón 100%, corte oversize.', precio: 59900, categoria: 'Camisetas', tags: ['oversize', 'algodón'], tallas: TALLAS_ROPA, colores: ['Negro', 'Blanco'] },
  { nombre: 'Camiseta Estampada Ciudad', descripcion: 'Estampado frontal inspirado en la calle.', precio: 69900, categoria: 'Camisetas', tags: ['estampado', 'nuevo'], tallas: TALLAS_ROPA, colores: ['Negro', 'Gris'] },
  { nombre: 'Jogger Cargo', descripcion: 'Jogger con bolsillos laterales y puño elástico.', precio: 119900, categoria: 'Pantalones', tags: ['cargo', 'jogger'], tallas: TALLAS_ROPA, colores: ['Negro', 'Verde oliva'] },
  { nombre: 'Jean Baggy', descripcion: 'Denim rígido de bota ancha.', precio: 149900, categoria: 'Pantalones', tags: ['denim', 'baggy'], tallas: TALLAS_ROPA, colores: ['Azul'] },
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

function crearVariantes(producto: ProductoSemilla) {
  return producto.tallas.flatMap((talla) =>
    producto.colores.map((color) => ({
      sku: crearSku(producto.nombre, talla, color),
      talla,
      color,
      stock: 10,
    }))
  );
}

async function main(): Promise<void> {
  // Se limpia en orden inverso a las relaciones para poder re-ejecutar el seed
  await prisma.orderItem.deleteMany();
  await prisma.orden.deleteMany();
  await prisma.variante.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();

  for (const categoria of CATEGORIAS) {
    await prisma.categoria.create({ data: categoria });
  }

  for (const producto of PRODUCTOS) {
    const texto = encodeURIComponent(producto.nombre);
    await prisma.producto.create({
      data: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        tags: producto.tags,
        imagenes: [`https://placehold.co/600x800/png?text=${texto}`],
        categoria: { connect: { nombre: producto.categoria } },
        variantes: { create: crearVariantes(producto) },
      },
    });
  }

  console.log(`Seed listo: ${CATEGORIAS.length} categorías, ${PRODUCTOS.length} productos`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
