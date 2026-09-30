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

// Formato común de todas las respuestas de /api
export interface IApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string;
}
