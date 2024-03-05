import { PrismaClient } from '@prisma/client';
import { env } from './env';
import { getSpecialistFullName } from '@/utils/getSpecialistFullName';

const globalForPrisma = global;

// eslint-disable-next-line
export let prisma = globalForPrisma.prisma;

if (!prisma) {
  prisma = new PrismaClient().$extends({
    query: {
      specialist: {
        async create({ args }) {
          const searchEntry = await prisma.searchEntry.create({
            data: {
              sortString: getSpecialistFullName(args.data),
              specialist: {
                create: args.data,
              },
            },
            select: {
              specialist: {},
            },
          });
          return searchEntry.specialist;
        },
      },
      organization: {
        async create({ args }) {
          const searchEntry = await prisma.searchEntry.create({
            data: {
              sortString: args.data.name,
              organization: {
                create: args.data,
              },
            },
            select: {
              organization: {},
            },
          });
          return searchEntry.organization;
        },
      },
    },
  });
}

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
