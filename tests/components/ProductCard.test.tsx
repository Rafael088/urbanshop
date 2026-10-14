import { render, screen } from '@testing-library/react';
import type { IProducto } from '@/types';
import { ProductCard } from '@/components/ProductCard';

jest.mock('next/image');
jest.mock('next/link');

function crearProducto(sobrescribir: Partial<IProducto> = {}): IProducto {
  return {
    id: 1,
    nombre: 'Camiseta Urbana',
    descripcion: 'Camiseta de algodón',
    precio: 75000,
    tags: ['nuevo', 'urbano', 'algodón'],
    imagenes: ['/camiseta.jpg'],
    categoria: { id: 1, nombre: 'Camisetas' },
    variantes: [{ id: 1, sku: 'CAM-001', stock: 10 }],
    ...sobrescribir,
  };
}

describe('ProductCard', () => {
  it('debe renderizar el nombre y el precio del producto', () => {
    const producto = crearProducto();

    render(<ProductCard producto={producto} />);

    expect(screen.getByText('Camiseta Urbana')).toBeInTheDocument();
    expect(screen.getByText('$ 75.000')).toBeInTheDocument();
  });

  it('debe mostrar hasta dos tags del producto', () => {
    const producto = crearProducto();

    render(<ProductCard producto={producto} />);

    expect(screen.getByText('nuevo')).toBeInTheDocument();
    expect(screen.getByText('urbano')).toBeInTheDocument();
    expect(screen.queryByText('algodón')).not.toBeInTheDocument();
  });

  it('debe enlazar a la página de detalle del producto', () => {
    const producto = crearProducto({ id: 7 });

    render(<ProductCard producto={producto} />);

    const enlace = screen.getByRole('link');
    expect(enlace).toHaveAttribute('href', '/productos/7');
  });

  it('debe usar una imagen placeholder cuando el producto no tiene imágenes', () => {
    const producto = crearProducto({ imagenes: [] });

    render(<ProductCard producto={producto} />);

    const imagen = screen.getByRole('img');
    expect(imagen).toHaveAttribute(
      'src',
      'https://placehold.co/600x800/png?text=Sin+imagen'
    );
  });
});
