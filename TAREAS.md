# Tareas

Reemplaza `[Nombre]` por el estudiante asignado. Marca con `[x]` cuando el PR quede mergeado.

## Frontend — Juan Camilo · guía: [docs/GUIA-FRONTEND.md](docs/GUIA-FRONTEND.md)

**Semana 1**
- [x] Componente `ProductCard.tsx` (ejemplo ya hecho)
- [x] Componente `ProductGrid.tsx`
- [x] Página `/` (home con grid de productos)
- [x] Página `/productos/[id]` (detalle con selector de variante)

**Semana 2**
- [x] Componente `VariantSelector.tsx` (talla/color)
- [x] Componentes `Cart.tsx` y `CartItem.tsx`
- [x] Página `/carrito`
- [ ] Página `/checkout` (formulario)

**Semana 3**
- [ ] Integración con Mercado Pago (botón pagar, redirect)
- [ ] Página de confirmación de pedido
- [ ] Responsive design (mobile-first) — parcial: home, producto y carrito; falta checkout y confirmación

## Backend — [Nombre] · guía: [docs/GUIA-BACKEND.md](docs/GUIA-BACKEND.md)

**Semana 1**
- [x] Prisma client singleton (ya hecho)
- [x] Endpoint `GET /api/productos` (ejemplo ya hecho)
- [x] Endpoint `GET /api/productos/[id]`

**Semana 2**
- [x] Endpoint `POST /api/orders` (crear orden)
- [x] Endpoint `POST /api/mercado-pago` (crear preferencia) + `src/lib/mercado-pago.ts`
- [x] Endpoint `POST /api/webhooks` (webhook de MP)

**Semana 3**
- [x] Reducir stock después del pago
- [x] Integración con Resend (email de confirmación) en `src/lib/email.ts`
- [x] Validación de inputs con Zod

## Testers — [Nombre] · guía: [docs/GUIA-TESTERS.md](docs/GUIA-TESTERS.md)

**Semana 1**
- [x] Configurar Jest y Testing Library (ya hecho)
- [x] Tests unitarios de `src/lib/cart.ts`
- [ ] Tests de validación de formularios

**Semana 2**
- [ ] Tests de componentes (ProductCard, Cart, CheckoutForm) — parcial: ProductCard y ProductGrid listos; faltan Cart y CheckoutForm
- [x] Configurar Playwright (ya hecho)
- [ ] Tests E2E del flujo básico

**Semana 3**
- [ ] Tests E2E completos (navegar → checkout → pago)
- [ ] Tests de casos de error
- [ ] Tests de webhook (pago exitoso/fallido)
