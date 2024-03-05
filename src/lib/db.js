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
        async create({ query, args }) {
          return prisma.$transaction(async trx => {
            const specialist = await query(args);
            await trx.searchEntry.create({
              data: {
                sortString: getSpecialistFullName(specialist),
                specialist: {
                  connect: {
                    id: specialist.id,
                  },
                },
              },
            });
            return specialist;
          });
        },
      },
      organization: {
        async create({ query, args }) {
          return prisma.$transaction(async trx => {
            const organization = await query(args);
            await trx.searchEntry.create({
              data: {
                sortString: organization.name,
                organization: {
                  connect: {
                    id: organization.id,
                  },
                },
              },
            });
            return organization;
          });
        },
      },
    },
  });
}

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
