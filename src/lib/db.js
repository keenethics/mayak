import { PrismaClient } from '@prisma/client';
import { env } from './env';
import { organizationQueryExtension, specialistQueryExtension } from './prismaExtensions';

const globalForPrisma = global;

// eslint-disable-next-line
export let prisma = globalForPrisma.prisma;

if (!prisma) {
  prisma = new PrismaClient();
  prisma = prisma.$extends({
    query: {
      specialist: specialistQueryExtension(prisma),
      organization: organizationQueryExtension(prisma),
    },
  });
}

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
