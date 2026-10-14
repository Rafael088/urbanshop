import { prisma } from '@/lib/prisma';

import type { IOrdenItem } from '@/types';

export async function reducirStockItems(items: IOrdenItem[]): Promise<void> {
  await prisma.$transaction(
    items.map((item) =>
      prisma.variante.update({
        where: { id: item.varianteId },
        data: { stock: { decrement: item.cantidad } },
      })
    )
  );
}
