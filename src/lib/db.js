import { PrismaClient } from '@prisma/client';
import { env } from './env';
import { organizationQueryExtension, specialistQueryExtension } from './prismaExtensions';

const globalForPrisma = global;

function extendPrisma(prisma) {
  return prisma.$extends({
    query: {
      specialist: specialistQueryExtension(prisma),
      organization: organizationQueryExtension(prisma),
    },
  });
}

export const prisma = globalForPrisma.prisma || extendPrisma(new PrismaClient());

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
