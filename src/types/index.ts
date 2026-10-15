// Contratos del dominio. Se definen aquí antes de implementar cualquier cosa.

export interface ICategoria {
  id: number;
  nombre: string;
  descripcion?: string | null;
}

export interface IVariante {
  id: number;
  sku: string;
  talla?: string | null;
  color?: string | null;
  stock: number;
}

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tags: string[];
  imagenes: string[];
  categoria: ICategoria;
  variantes: IVariante[];
}

export interface ICarritoItem {
  productoId: number;
  varianteId: number;
  cantidad: number;
  precio: number;
  nombre: string;
  imagen: string;
  talla?: string;
  color?: string;
}

export interface IOrdenItem {
  productoId: number;
  varianteId: number;
  cantidad: number;
  precio: number;
}

export interface IOrden {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal?: string;
  items: IOrdenItem[];
}

// Datos que el cliente escribe en el formulario de checkout
export interface IDatosEnvio {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal?: string;
}

// Desglose de costos mostrado en carrito y checkout
export interface IResumenCheckout {
  subtotal: number;
  envio: number;
  total: number;
  faltaParaEnvioGratis: number;
}

// Respuesta mínima de POST /api/orders que usa el frontend
export interface IOrdenCreada {
  id: number;
}

// Errores por campo del formulario de checkout
export type ErroresEnvio = Partial<Record<keyof IDatosEnvio, string>>;

// Respuesta de POST /api/mercado-pago
export interface IPreferenciaPago {
  preferenceId: string | null;
  initPoint: string | null;
  sandboxInitPoint: string | null;
}

// Formato común de todas las respuestas de /api
export interface IApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string;
}
