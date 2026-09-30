# Guía para Backend

## Tu Área de Trabajo

Trabajas en:
- `src/app/api/` → todas las rutas de API
- `src/lib/prisma.ts` → cliente Prisma
- `src/lib/mercado-pago.ts` → configuración MP
- `src/lib/email.ts` → configuración Resend
- `prisma/schema.prisma` → modelo de datos

## NO toques:
- `src/components/` → eso es del frontend
- `src/app/page.tsx` → eso es del frontend
- `src/app/carrito/` → eso es del frontend

## Convenciones

### API Routes
- Validar inputs con Zod
- Retornar formato: `{ data, error, message }`
- Manejar errores con try/catch
- Usar Prisma client de `src/lib/prisma.ts`

### Base de Datos
- Queries solo con Prisma
- Usar `include` para relaciones
- No exponer datos sensibles

### Servicios
- Crear funciones en `src/lib/` para lógica de negocio
- Ejemplo: `src/lib/cart.ts` para lógica del carrito
- Una función = una responsabilidad

## Ejemplo de Tarea

**Crear endpoint GET /api/productos**

1. Crear archivo `src/app/api/productos/route.ts`
2. Importar Prisma client
3. Crear función GET
4. Query con Prisma: `prisma.producto.findMany()`
5. Incluir relaciones: `include: { categoria: true, variantes: true }`
6. Retornar JSON con formato `{ data: productos }`
7. Manejar errores con try/catch

## Recursos
- Prisma: https://www.prisma.io/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Mercado Pago SDK: https://www.mercadopago.com.co/developers/panel/docs
