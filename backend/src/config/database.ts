import { PrismaClient } from '@prisma/client';
import { isProduction } from './env.js';

/**
 * Singleton — quan trọng với `tsx watch`: mỗi lần reload không được tạo
 * thêm connection pool mới, nếu không PostgreSQL sẽ hết slot.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProduction ? ['error'] : ['warn', 'error'],
  });

if (!isProduction) {
  globalForPrisma.prisma = prisma;
}
