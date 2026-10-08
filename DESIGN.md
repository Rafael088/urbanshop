---
name: Urbanshop
description: Tienda de ropa y accesorios urbanos con identidad de tienda de discos / crate-digging.
colors:
  papel: "#F3EFE4"
  papel-deriva: "#EAF0E7"
  carton: "#E7DFCC"
  surco: "#CFC5AC"
  tinta: "#1B1A17"
  tinta-suave: "#46413A"
  prensa: "#C43D2B"
  cara-b: "#2E6B67"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5.25rem)"
    fontWeight: 900
    fontVariationSettings: "'wdth' 118"
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Martian Mono, monospace"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  mono:
    fontFamily: "Martian Mono, monospace"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  none: "0"
  sm: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  button-primary-hover:
    backgroundColor: "#2A2823"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  button-prensa:
    backgroundColor: "{colors.prensa}"
    textColor: "{colors.papel}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "14px 14px"
  price-line:
    typography: "{typography.mono}"
---

# Design System: Urbanshop

## Overview

**Creative North Star: "La tienda de discos de la ropa urbana"**

Urbanshop adopta el vocabulario gráfico de una tienda de discos colombiana: fundas de vinilo, lomos apilados, etiquetas troqueladas y números de catálogo impresos. El producto es el protagonista; la interfaz se limita a organizar la colección como una batea ordenada y terminar la compra con un recibo troquelado. La densidad es alta cuando hay variedad, pero cada ficha respira lo suficiente para no competir con el grabado de la portada.

El fondo no es un beige genérico de plantilla: es el papel sin blanquear de las fundas de vinilo, con una deriva verde suave que evoca el reverso de las caras B. La tinta es casi negra, nunca pura, y el rojo de prensa actúa como el único acento de acción.

**Key Characteristics:**
- Cuadrícula de "fundas" cuadradas como catálogo principal.
- Tipografía condensada expansiva en display, monoespaciada en precios y catálogos.
- Estados de stock como trama impresa (densidad de hatch), no como badges redondeados.
- Formas angulares: sin radios en botones primarios, bordes de 1px y hairlines.
- Importes alineados a la derecha con línea de puntos, estilo tracklist de cassette.

## Colors

La paleta parte del papel de funda de vinilo y la tinta de imprenta, con dos acentes funcionales.

### Primary
- **Rojo Prensa** (#C43D2B): acción principal (pagar, OBI, stock bajo, errores). Rara vez cubre más del 5–10% de una pantalla.

### Secondary
- **Cara B** (#2E6B67): lomos de categoría, estados de éxito/pago, lados laterales de las fundas.

### Neutral
- **Papel** (#F3EFE4): fondo general y superficies de lectura.
- **Papel Deriva** (#EAF0E7): fondo de bloques resumen, gradiente sutil de esquina.
- **Cartón** (#E7DFCC): portadas/platos, bloques suaves.
- **Surco** (#CFC5AC): bordes, hairlines y estados vacíos.
- **Tinta** (#1B1A17): textos, header, botones primarios. Nunca negro puro.
- **Tinta Suave** (#46413A): labels, metadatos, subtítulos.

### Named Rules
**The One Pressing Rule.** El rojo #C43D2B es el único color que grita. Aparece solo en CTA de pago, franja OBI, alertas de stock y estados activos. Si otro elemento necesita acento, usa Cara B o un hairline.

## Typography

**Display Font:** Archivo (sans-serif), eje de anchura variable para SemiExpanded/Expanded.
**Body Font:** Archivo (regular), el mismo sistema en pesos menores.
**Label/Mono Font:** Martian Mono, para catálogos, precios, números de orden y microcopy.

**Character:** Archivo en pesos 800–900 con wdth 110–125 da la voz de un cartel de discos; Martian Mono aporta la frialdad del catálogo y el recibo.

### Hierarchy
- **Display** (900, clamp 40–84px, line-height 0.95): títulos de página como "La batea completa" o hero.
- **Headline** (800, 30–44px, line-height 1): nombres de producto en detalle.
- **Title** (700, 17–22px, line-height 1.1): nombres de producto en grid, secciones.
- **Body** (500, 17px, line-height 1.65): descripciones, notas, ayudas. Máximo 65–75ch.
- **Label** (700 mono, 11–12px, letter-spacing 0.10–0.22em, uppercase): categorías, SKUs, catálogos.
- **Price** (700 mono, 14–16px): importes siempre tabulares, alineados a la derecha.

### Named Rules
**The Catalog Number Rule.** Todo producto lleva un número de catálogo visible (CAT.001...) en Martian Mono 11px; los precios se alinean a la derecha con línea de puntos, como los tiempos de una cara B.

## Layout

- Contenedor fluido con padding de 40px en desktop, 18px en móvil.
- Grid de productos: 4 columnas en desktop, 2 en móvil; gap 24–28px horizontal, 28px vertical.
- Rejilla base de 12 columnas implícita para bloques de detalle y checkout.
- Espaciado vertical: 56px entre secciones principales; 24px dentro de un bloque; 12–16px entre elementos emparentados.
- Responsive breakpoint: 560px. A partir de ahí se apilan bloques, se oculta el nav de cabecera y las categorías pasan a columna.

## Elevation & Depth

El sistema es plano por defecto. No hay sombras decorativas; la profundidad se lee por capas de papel (Papel → Cartón → Tinta) y por hairlines de 1px. La única excepción es el recibo de confirmación, que flota sobre un box-shadow difuso sutil para separarlo del fondo.

### Shadow Vocabulary
- **Recibo** (`box-shadow: 0 18px 34px rgba(27,26,23,.10)`): único uso permitido, en la confirmación.

### Named Rules
**The Paper Layer Rule.** La profundidad se resuelve con tonos de papel y bordes, nunca con glassmorphism, blur decorativo o sombras de bloque duro.

## Shapes

- Radios: 0 en botones, inputs y contenedores principales.
- Excepciones redondeadas: el sello circular de la marca, el badge "NUEVO" y los puntos de estado del pedido (círculos).
- Bordes: 1px `surco` para contenedores suaves; 2px `tinta` para resúmenes y acciones importantes; 1px `tinta` para inputs y botones secundarios.
- Líneas: hairlines de 1px para dividir filas; líneas punteadas entre items de carrito/recibo.

## Components

### Buttons
- **Shape:** rectángulo sin radio.
- **Primary:** fondo `tinta`, texto `papel`, padding 18px 28px, fuente Martian Mono 14px negrita mayúsculas.
- **Secondary/Ghost:** fondo transparente, borde 1px `tinta`, texto `tinta`.
- **Prensa:** fondo `prensa`, texto `papel`, para CTA de pago.
- **Hover:** oscurecimiento sutil (`#2A2823` en primary); sin transformaciones ni elevación.
- **Disabled:** fondo `carton`, texto `#9A917E`, borde `surco`.

### Product Sleeve (funda)
- **Shape:** cuadrado 1:1, borde 1px `surco`, fondo `carton` con surcos radiales sutiles.
- **Content:** lomo vertical `cara-b` a la izquierda con la categoría en vertical; nombre del producto como grabado tipográfico centrado; sello "NUEVO" rotado si aplica.
- **Meta debajo:** CAT.XXX a la izquierda, precio a la derecha, línea de hatch de stock debajo.

### Price Tag
- **Style:** Martian Mono 700, alineado a la derecha, precedido de línea de puntos cuando está en un resumen.
- **Rule:** importes siempre en COP, sin decimales, tabulares.

### Stock Hatch
- **Shape:** barra de 10px de alto con trama de 45°.
- **Lleno:** líneas densas = stock saludable.
- **Tibio:** líneas medias = pocas unidades.
- **Última:** líneas ralas = últimas piezas.
- **Vacío:** líneas grises punteadas = agotado.

### Inputs / Fields
- **Style:** fondo transparente, borde 1px `tinta`, padding 14px, sin radio.
- **Focus:** outline 2px `prensa`, offset 2px.
- **Error:** borde `prensa`, mensaje debajo en mono mayúsculas.

### Navigation
- **Desktop:** header `tinta` fijo de 84px, marca a la izquierda, links de categoría en Martian Mono mayúsculas, carrito como pastilla de borde `papel`.
- **Mobile:** misma barra sin links de texto; menú hamburguesa o menú de cajón (a definir en implementación).

### Order Receipt (recibo)
- **Shape:** rectángulo borde `tinta`, fondo `papel`, parte inferior troquelada con semicírculos.
- **Content:** tabla monoespaciada de items, líneas punteadas, total en negrita, ruta de estado del pedido con puntos y línea segmentada.

## Do's and Don'ts

### Do:
- **Do** usar el número de catálogo visible y precios tabulares a la derecha en cada ficha.
- **Do** representar el stock como trama impresa antes que como un badge.
- **Do** mantener botones y inputs cuadrados; el único redondeo permitido es el sello de marca y los puntos de estado.
- **Do** usar el rojo prensa con contención: CTA de pago, OBI, errores y stock bajo.
- **Do** reservar mucho aire alrededor del recibo de confirmación.

### Don't:
- **Don't** usar esquinas redondeadas por defecto en tarjetas, botones o inputs.
- **Don't** usar gradientes de texto, glassmorphism o sombras duras de decoración.
- **Don't** inventar testimonios, estrellas de valoración o contadores de ventas.
- **Don't** usar el mono para textos largos; solo para catálogo, precios y labels cortos.
- **Don't** aplicar el rojo como fondo de áreas grandes; es acento, no superficie.
