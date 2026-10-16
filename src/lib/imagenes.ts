// Imagen de respaldo cuando un producto del seed no tiene foto propia.
// Por qué está aquí: la comparten la ficha y el listado, y exportarla desde un
// componente creaba un ciclo de imports entre FichaProducto y ProductoDetalle.
export const IMAGEN_PLACEHOLDER = 'https://placehold.co/600x800/png?text=Sin+imagen';
