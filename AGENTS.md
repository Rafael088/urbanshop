# Reglas para Agentes de IA

## Contexto del Proyecto

Eres un asistente de desarrollo para un e-commerce de ropa y accesorios urbanos.
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma 6, PostgreSQL, Zod 4
- **Base de datos**: Supabase
- **Pagos**: Mercado Pago Checkout Pro
- **Email**: Resend
- **Carrito**: localStorage (sin autenticación)
- **Público**: Estudiantes aprendiendo Programación Orientada a Objetos

## Ojo con las versiones

- Next.js 16: en páginas y rutas dinámicas `params` es una **Promise** → `const { id } = await params`.
  En route handlers usa el helper global `RouteContext<'/api/productos/[id]'>`.
- Tailwind v4: no hay `tailwind.config.ts`; la configuración vive en `src/app/globals.css`.
- Prisma 6: el cliente se regenera con `npx prisma generate` después de cambiar el schema.
- Los ejemplos reales del repo mandan sobre los de este archivo: `src/components/ProductCard.tsx`,
  `src/app/api/productos/route.ts`, `src/lib/cart.ts`, `src/types/index.ts`.

## Reglas Obligatorias

### 1. TypeScript estricto
- SIEMPRE usar tipos explícitos, nunca `any`
- Definir interfaces en `src/types/index.ts`
- Usar tipos de Prisma generados automáticamente

### 2. Programación Orientada a Objetos
- **Encapsulamiento**: propiedades privadas con getters/setters cuando sea necesario
- **Composición**: preferir composición sobre herencia
- **Interfaces**: definir contratos en `src/types/` antes de implementar
- **Responsabilidad única**: cada función/clase hace UNA sola cosa
- **Nombres descriptivos**: `calcularTotalOrden()` no `calc()`

### 3. Estructura de Archivos
- Componentes React: PascalCase (`ProductCard.tsx`)
- Utilidades/lib: camelCase (`cart.ts`, `email.ts`)
- Rutas API: estructura de carpetas (`api/productos/route.ts`)
- Tipos: todo en `src/types/index.ts`

### 4. Convenciones de Código
- Imports: agrupar (React, librerías, componentes, tipos, utilidades)
- Funciones: máximo 30 líneas, si es más largo, dividir
- Componentes: máximo 100 líneas
- Comentarios: solo para explicar "por qué", no "qué"
- No usar `console.log` en código final

### 5. Componentes React
- Usar functional components con hooks
- Props tipadas con interfaces
- No lógica de negocio en componentes (usar hooks personalizados o lib/)
- Tailwind para estilos, no CSS modules

### 6. API Routes
- Validar inputs con Zod
- Retornar respuestas con formato consistente: `{ data, error, message }`
- Manejar errores con try/catch
- Usar Prisma client singleton de `src/lib/prisma.ts`

### 7. Base de Datos
- NUNCA hacer queries sin Prisma
- Usar `include` para relaciones cuando sea necesario
- No exponer datos sensibles en respuestas

### 8. Carrito (localStorage)
- Estructura: `{ items: [{ productoId, varianteId, cantidad, precio, nombre, imagen }] }`
- Funciones en `src/lib/cart.ts`: `agregarItem()`, `quitarItem()`, `actualizarCantidad()`, `limpiarCarrito()`, `obtenerCarrito()`
- Sincronizar con estado de React (context o estado local)

### 9. Pruebas
- Tests unitarios para funciones de `src/lib/`
- Tests de componentes para UI
- Tests E2E para flujos completos
- Usar Jest + Testing Library + Playwright

### 10. Seguridad
- NUNCA exponer API keys en el frontend
- Validar TODOS los inputs del usuario
- Sanitizar datos antes de guardar en DB
- Usar variables de entorno para secrets

## Ejemplos de Código Esperado

### Interfaz TypeScript (src/types/index.ts)
```typescript
export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tags: string[];
  imagenes: string[];
  categoria: ICategoria;
  variantes: IVariante[];
}

export interface IVariante {
  id: number;
  sku: string;
  talla?: string;
  color?: string;
  stock: number;
}

export interface ICarritoItem {
  productoId: number;
  varianteId: number;
  cantidad: number;
  precio: number;
  nombre: string;
  imagen: string;
  talla?: string;
  color?: string;
}

export interface IOrden {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal?: string;
  items: IOrdenItem[];
}
```

### Componente React (src/components/ProductCard.tsx)
```typescript
import Link from 'next/link';
import type { IProducto } from '@/types';

interface ProductCardProps {
  producto: IProducto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <Link href={`/productos/${producto.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-gray-600 text-sm mt-1">{precioFormateado}</p>
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
```

### Función de Carrito (src/lib/cart.ts)
```typescript
import type { ICarritoItem } from '@/types';

const CART_KEY = 'ecommerce-cart';

export function obtenerCarrito(): ICarritoItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function agregarItem(nuevoItem: ICarritoItem): void {
  const carrito = obtenerCarrito();
  const existente = carrito.find(
    (item) => item.productoId === nuevoItem.productoId && item.varianteId === nuevoItem.varianteId
  );

  if (existente) {
    existente.cantidad += nuevoItem.cantidad;
  } else {
    carrito.push(nuevoItem);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function quitarItem(productoId: number, varianteId: number): void {
  const carrito = obtenerCarrito();
  const filtrado = carrito.filter(
    (item) => !(item.productoId === productoId && item.varianteId === varianteId)
  );
  localStorage.setItem(CART_KEY, JSON.stringify(filtrado));
}

export function limpiarCarrito(): void {
  localStorage.removeItem(CART_KEY);
}
```

### API Route (src/app/api/productos/route.ts)
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        variantes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
```

## Qué NO Hacer

- ❌ Usar `any` en TypeScript
- ❌ Lógica de negocio en componentes React
- ❌ Queries directas a la base de datos sin Prisma
- ❌ Exponer API keys en el frontend
- ❌ Commits gigantes (máximo 1 tarea por commit)
- ❌ Copiar código sin entenderlo
- ❌ Modificar archivos fuera de tu área de responsabilidad sin consultar
- ❌ Usar `console.log` en código final
- ❌ Crear componentes de más de 100 líneas
- ❌ Funciones de más de 30 líneas

## Flujo de Trabajo con Agente

1. Leer este archivo AGENTS.md antes de generar código
2. Entender la tarea asignada
3. Revisar los archivos existentes relacionados
4. Generar código siguiendo las reglas
5. Explicar qué hizo y por qué
6. Si hay dudas, preguntar antes de asumir

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
