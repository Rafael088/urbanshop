# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Compradores jóvenes (18–30) de ropa y accesorios urbanos en Colombia: streetwear, zapatillas, gorras, jackets. Vienen desde redes sociales o buscador, navegan desde el móvil la mayoría de las veces, y compran sin crear cuenta. Secundario: estudiantes que construyen esta tienda aprendiendo POO (el repo es docente, el diseño es parte de su guía de frontend).

## Product Purpose

Tienda e-commerce de ropa y accesorios urbanos. El visitante explora el catálogo, elige talla/color de un producto, arma un carrito guardado en el navegador y paga online vía Mercado Pago Checkout Pro. Éxito: completar la compra sin fricción y sin registro.

## Positioning

Streetwear curado con compra anónima y fluida: el carrito vive en el navegador (localStorage), el pago y la confirmación ocurren en minutos, con entrega en Colombia (departamentos en el checkout).

## Operating Context

- Catálogo con productos, categorías, tags e imágenes múltiples; variantes por talla y color con stock propio.
- Carrito en localStorage sin autenticación; checkout con nombre, email, teléfono, dirección, ciudad y departamento.
- Pago por Mercado Pago; el pedido pasa PENDIENTE → PAGADA vía webhook; baja de stock tras el pago.
- Moneda COP, español.

## Capabilities and Constraints

- Stack fijo: Next.js 16 App Router, React 19, Tailwind v4, Prisma + Supabase; el diseño no puede exigir componentes que rompan estas reglas.
- Sin cuentas de usuario, sin wishlist, sin reseñas (no inventar).
- Precios en COP sin decimales (formato Intl es-CO).
- Nombre de la marca: **Urbanshop** (decidido por el dueño del repo).
- El entregable actual son diseños visuales (PNG) que guiarán las tareas de frontend de TAREAS.md; no es código de producción.

## Brand Commitments

- Identidad propia urbana elegida por el usuario (no aplicar la marca Anthropic tal cual; su skill solo se usó como referencia de estructura).
- Sin logo ni paleta previos: todo se define aquí.

## Evidence on Hand

- Esquema Prisma completo (Producto, Variante, Orden con estado y campos MP), semilla de datos en prisma/seed.ts, contratos en src/types/index.ts, librería de carrito src/lib/cart.ts, ProductCard.tsx y GET /api/productos funcionando.
- No hay fotografía real de producto: los mockups usarán placeholders autorizados como material de diseño, etiquetados como tal para reemplazo posterior.
- No existen testimonios, precios reales de envío ni política de devoluciones: no inventarlos en los diseños.

## Product Principles

1. El producto es el héroe: la interfaz desaparece para dejar ver la ropa.
2. Comprar sin cuenta debe sentirse más fácil, no menos confiable.
3. Cada pantalla responde una sola pregunta: ver → elegir → pagar → confirmar.
4. Mobile primero: la mayoría del tráfico urbano real ocurre en el teléfono.

## Accessibility & Inclusion

Sin requisito formal declarado; los diseños mantienen contraste AA y targets táctiles cómodos por convención del oficio.
