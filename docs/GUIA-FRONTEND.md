# Guía para Frontend

## Tu Área de Trabajo

Trabajas en:
- `src/app/page.tsx` → home
- `src/app/productos/[id]/page.tsx` → detalle producto
- `src/app/carrito/page.tsx` → carrito
- `src/app/checkout/page.tsx` → formulario checkout
- `src/components/` → todos los componentes

## NO toques:
- `src/app/api/` → eso es del backend
- `src/lib/prisma.ts` → eso es del backend
- `prisma/schema.prisma` → eso es del backend

## Convenciones

### Componentes
- Nombre en PascalCase: `ProductCard.tsx`
- Props tipadas con interfaces
- Máximo 100 líneas por componente
- Si crece mucho, dividir en sub-componentes

### Estilos
- Tailwind CSS siempre
- No CSS modules ni styled-components
- Clases responsivas: `w-full md:w-1/2 lg:w-1/3`

### Estado
- useState para estado local
- useEffect para efectos secundarios
- Context API si necesitas estado global (carrito)
- No Redux ni Zustand (innecesario para este proyecto)

## Ejemplo de Tarea

**Crear componente ProductCard**

1. Crear archivo `src/components/ProductCard.tsx`
2. Importar interfaz `IProducto` de `@/types`
3. Definir props con interfaz
4. Renderizar imagen, nombre, precio, tags
5. Envolver en Link a `/productos/[id]`
6. Usar Tailwind para estilos

## Recursos
- Documentación Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
