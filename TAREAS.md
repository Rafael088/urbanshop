# Tareas

Reemplaza `[Nombre]` por el estudiante asignado. Marca con `[x]` cuando el PR quede mergeado.

## Frontend — [Nombre] · guía: [docs/GUIA-FRONTEND.md](docs/GUIA-FRONTEND.md)

**Semana 1**
- [x] Componente `ProductCard.tsx` (ejemplo ya hecho)
- [ ] Componente `ProductGrid.tsx`
- [ ] Página `/` (home con grid de productos)
- [ ] Página `/productos/[id]` (detalle con selector de variante)

**Semana 2**
- [ ] Componente `VariantSelector.tsx` (talla/color)
- [ ] Componentes `Cart.tsx` y `CartItem.tsx`
- [ ] Página `/carrito`
- [ ] Página `/checkout` (formulario)

**Semana 3**
- [ ] Integración con Mercado Pago (botón pagar, redirect)
- [ ] Página de confirmación de pedido
- [ ] Responsive design (mobile-first)

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
- [ ] Reducir stock después del pago
- [ ] Integración con Resend (email de confirmación) en `src/lib/email.ts`
- [ ] Validación de inputs con Zod

## Testers — [Nombre] · guía: [docs/GUIA-TESTERS.md](docs/GUIA-TESTERS.md)

**Semana 1**
- [x] Configurar Jest y Testing Library (ya hecho)
- [ ] Tests unitarios de `src/lib/cart.ts`
- [ ] Tests de validación de formularios

**Semana 2**
- [ ] Tests de componentes (ProductCard, Cart, CheckoutForm)
- [x] Configurar Playwright (ya hecho)
- [ ] Tests E2E del flujo básico

**Semana 3**
- [ ] Tests E2E completos (navegar → checkout → pago)
- [ ] Tests de casos de error
- [ ] Tests de webhook (pago exitoso/fallido)
