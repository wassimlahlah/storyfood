// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// تعريف نسخة واحدة من PrismaClient لتجنب تعدد الاتصالات أثناء التطوير
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// إذا نحن في وضع التطوير، خزّن النسخة على globalThis
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
