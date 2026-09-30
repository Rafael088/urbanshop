# Convenciones de Código

Resumen rápido. La versión completa (con ejemplos) está en [`AGENTS.md`](../AGENTS.md).

## Nombres
- Componentes React: PascalCase → `ProductCard.tsx`
- Utilidades en `src/lib/`: camelCase → `cart.ts`, `email.ts`
- Funciones y variables en español y descriptivas → `calcularTotalOrden()`, no `calc()`
- Interfaces con prefijo `I` en `src/types/index.ts` → `IProducto`, `ICarritoItem`

## Tamaños
- Funciones: máximo 30 líneas
- Componentes: máximo 100 líneas

## TypeScript
- Nunca `any`
- Define la interfaz en `src/types/` **antes** de implementar

## POO
- Encapsulamiento, composición sobre herencia, responsabilidad única
- La lógica de negocio va en `src/lib/` o en hooks, no en componentes

## Imports (en este orden, separados por línea en blanco)
1. React / Next
2. Librerías externas
3. Componentes
4. Tipos
5. Utilidades (`@/lib/...`)

## API
- Respuesta siempre con forma `{ data, error, message }` (`IApiResponse<T>`)
- Validar con Zod, `try/catch` en cada handler, Prisma desde `@/lib/prisma`

## Otros
- Estilos solo con Tailwind
- Comentarios para explicar el **por qué**, no el qué
- Sin `console.log` en código final
