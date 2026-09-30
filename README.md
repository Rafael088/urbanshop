# E-commerce urbano — Clase POO

Tienda de ropa y accesorios urbanos: Next.js 16 + TypeScript + Tailwind, Prisma + Supabase,
Mercado Pago Checkout Pro y Resend. Carrito en localStorage, sin autenticación. Envío gratis, solo Colombia.

## Empieza aquí
1. [docs/SETUP.md](docs/SETUP.md) — instalar y correr el proyecto
2. [AGENTS.md](AGENTS.md) — reglas obligatorias (también para tu agente de IA)
3. [TAREAS.md](TAREAS.md) — tu tarea de la semana
4. Tu guía: [Frontend](docs/GUIA-FRONTEND.md) · [Backend](docs/GUIA-BACKEND.md) · [Testers](docs/GUIA-TESTERS.md)
5. [docs/FLUJO-GIT.md](docs/FLUJO-GIT.md) y [docs/CONVENCIONES.md](docs/CONVENCIONES.md)

## Flujo de compra
1. Home lista productos → `GET /api/productos`
2. Detalle con variantes → `GET /api/productos/[id]`
3. Talla/color → carrito (localStorage)
4. Checkout → formulario de envío
5. Pagar → `POST /api/orders` (orden PENDIENTE) → `POST /api/mercado-pago` (preferencia) → redirección a MP
6. Webhook `POST /api/webhooks` → orden PAGADA, baja stock, email con Resend
