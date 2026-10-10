import { ProductoDetalle } from '@/components/ProductoDetalle';

interface ProductoPaginaProps {
  // En Next.js 16 params es un Promise y debe resolverse con await
  params: Promise<{ id: string }>;
}

export default async function ProductoPagina({ params }: ProductoPaginaProps) {
  const { id } = await params;
  const productoId = Number(id);

  return (
    <main className="flex-1 p-6 md:p-10">
      <ProductoDetalle productoId={productoId} />
    </main>
  );
}
