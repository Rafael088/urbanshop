---
version: 1
slug: "src-app-productos-id-page-tsx"
primary_target: "src/app/productos/[id]/page.tsx"
related_targets: ["src/components/FichaProducto.tsx","src/components/ProductoDetalle.tsx","src/components/VariantSelector.tsx","src/app/layout.tsx"]
---

# Surface: /productos/[id] — Detalle de producto

**Scope & mode:** Persuade. Pantalla única donde el visitante decide y agrega a la bolsa. Primary target: `src/app/productos/[id]/page.tsx`. Related: `src/components/FichaProducto.tsx`, `src/components/ProductoDetalle.tsx`, `src/components/VariantSelector.tsx`, `src/app/layout.tsx` (tipografía global, aprobada por el usuario).

**Audience:** compradores 18–30 de streetwear en Colombia, mayoría desde el móvil, sin cuenta.
**Job:** elegir talla/color y meterlo a la bolsa en segundos.
**Action:** «Agregar a la bolsa» con variante elegida; atajo a «Ver carrito».
**Proof/content:** precio COP real de Prisma, tags y descripción reales, SKU y stock reales, número de catálogo derivado del id. Sin testimonios, estrellas ni valoraciones inventadas.
**Constraints:** Next.js 16 / React 19 / Tailwind v4 (sin tailwind.config), Prisma, TS estricto sin `any`, componentes ≤100 líneas, funciones ≤30, sin `console.log`, tokens de DESIGN.md, esquinas rectas.

## Direction contract

### THESIS
La ficha es una **página de catálogo de tienda de discos**: el producto se presenta como una funda (lado A, 33⅓ RPM) y la compra se resuelve en un solo bloque de controles duros a la derecha. Se rechaza el layout genérico de e-commerce (imagen redondeada + botón negro centrado + chips grises de Tailwind) que hoy la hace ver como plantilla sin terminar.

### OWN-WORLD
Papel `#F3EFE4` de fondo, tinta `#1B1A17` para texto y controles, rojo prensa `#C43D2B` como único grito (CTA de compra, franja OBI, agotados), cara B `#2E6B67` para estados de éxito, cartón `#E7DFCC` con surcos radiales bajo la imagen, hairlines de 1px `surco` y 2px `tinta` para separadores. Tipografía: Archivo 800–900 para el nombre y Martian Mono 700 mayúsculas con tracking 0.16em para labels, precios, SKU y microcopy. Cero border-radius en todo lo que sea control; radios solo en el sello de marca.

### STORY
Entra, ve la prenda grande y limpia → lee precio y catálogo como en un sello → elige color y talla viendo cuáles hay y cuáles no → el stock se lee como trama impresa, no como badge → cantidad y «Agregar a la bolsa» ocupan una franja imposible de perder → abajo, «La ficha» responde dudas de talla sin ruido. En móvil: imagen arriba, controles debajo, CTA siempre alcanzable.

### FIRST VIEWPORT
Desktop (≥1024): header tinta fijo; migas `TODO / CATEGORÍA / NOMBRE` en mono; grid de 2 columnas — izquierda imagen 1:1 sobre cartón con surcos radiales y franja OBI prensa bajo ella (`LADO A · 33⅓ RPM` / `ESTAMPADO FRONTAL`) más tira de miniaturas; derecha: precio en mono 40px + `CAT.XXX · COP` alineado a la derecha, hairline de 2px, nombre del producto en Archivo 900 clamp 40–64px, chips de tags con borde 1px, bloques COLOR y TALLA con valor alineado a la derecha, botones cuadrados (activo = tinta llena; agotado = tachado), trama de stock + `EN ESTA VARIANTE: X DE Y`, y la franja de compra `− 1 +` junto al CTA prensa `AGREGAR A LA BOLSA` a ancho completo. Mobile (390): se apila en el mismo orden, CTA a ancho completo bajo la trama.

### FORM
Forma elegida: **el mockup aprobado `docs/disenos/urbanshop-02-producto-{desktop,movil}.png`**, que el usuario designó al elegir «aplicar el mundo Urbanshop». Posición: única del listado (petición de precisión, no torneo). Seed key: no impreso — `concept-seed` no corre porque la composición ya está aprobada en el repo y el usuario fijó la dirección (un usuario fijado vence al roll). Build **code-led**: sin generación de imágenes en este harness, no hay comp.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

**Memorable moment:** la trama de stock de 45° que cambia de densidad al elegir talla y deja ver de un vistazo qué tallas quedan, con la franja OBI roja anclando la imagen como el lado A de un vinilo.

**Unresolved decisions:** si la tira de miniaturas se oculta cuando el producto tiene una sola imagen (hoy todos tienen 1) o se muestra siempre como el mockup.

## Decisiones de acabado (tras la ronda de revisión final)

- Miniaturas: solo se pintan si `imagenes.length > 1`; con una sola foto la tira no aporta nada.
- Franja OBI: el rótulo derecho dice `Portada` (o `Imagen n de m`), no la categoría: la categoría ya vive en las migas de pan.
- CTA: "Agregar al carrito" (lenguaje del sitio: header, /carrito, Cart) en vez del "Agregar a la bolsa" del mockup. Desvío consciente del comp para no mezclar sinónimos.
- Stock: "En esta variante: X de Y unidades" para que la densidad de la trama se lea como proporción.
- Sleeve: la foto va dentro del cartón (margen 5%) para que los surcos se vean, tal como en el mockup.
- Fondo global: `--background` = papel (#f3efe4); se borró el bloque `prefers-color-scheme: dark` (no lo usaba nadie y contradecía el mundo Urbanshop).
- Datos: `useProducto` llama a `GET /api/productos/[id]` y valida que la respuesta sea un registro con variantes antes de pintar.
- Fuera de alcance (pendiente, tocar SiteHeader/compartidos): navegación de categorías y badge rojo del carrito del mockup; título del documento con el nombre real del producto.
