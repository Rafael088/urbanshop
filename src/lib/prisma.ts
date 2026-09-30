import { PrismaClient } from '@prisma/client';

// En desarrollo el hot reload re-ejecuta este módulo; guardar el cliente en
// globalThis evita abrir una conexión nueva a Supabase en cada recarga.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
