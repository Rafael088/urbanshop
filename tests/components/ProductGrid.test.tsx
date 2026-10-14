import { render, screen } from '@testing-library/react';
import type { IProducto } from '@/types';
import { ProductGrid } from '@/components/ProductGrid';

jest.mock('next/image');
jest.mock('next/link');

function crearProducto(sobrescribir: Partial<IProducto> = {}): IProducto {
  return {
    id: 1,
    nombre: 'Camiseta Urbana',
    descripcion: 'Camiseta de algodón',
    precio: 50000,
    tags: ['nuevo', 'urbano'],
    imagenes: ['/camiseta.jpg'],
    categoria: { id: 1, nombre: 'Camisetas' },
    variantes: [{ id: 1, sku: 'CAM-001', stock: 10 }],
    ...sobrescribir,
  };
}

describe('ProductGrid', () => {
  it('debe mostrar un mensaje cuando no hay productos', () => {
    render(<ProductGrid productos={[]} />);

    expect(screen.getByText('No hay productos disponibles.')).toBeInTheDocument();
  });

  it('debe renderizar un ProductCard por cada producto', () => {
    const productos = [
      crearProducto({ id: 1, nombre: 'Camiseta A' }),
      crearProducto({ id: 2, nombre: 'Camiseta B' }),
    ];

    render(<ProductGrid productos={productos} />);

    expect(screen.getByText('Camiseta A')).toBeInTheDocument();
    expect(screen.getByText('Camiseta B')).toBeInTheDocument();
  });

  it('debe renderizar los enlaces con la ruta correcta', () => {
    const productos = [crearProducto({ id: 5, nombre: 'Camiseta Link' })];

    render(<ProductGrid productos={productos} />);

    const enlace = screen.getByRole('link', { name: /Camiseta Link/i });
    expect(enlace).toHaveAttribute('href', '/productos/5');
  });
});
