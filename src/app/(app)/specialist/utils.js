import { prisma } from '@/lib/db';
import { specialistInclude } from '@/app/(app)/specialist/consts';

export const getSpecialistById = async ({ id }) =>
  prisma.specialist.findUnique({
    where: {
      id,
    },
    include: specialistInclude,
  });

export const getSpecialists = async ({ model, orderByCondition, include }) =>
  await prisma[model].findMany({
    where: {
      isActive: true,
    },
    orderBy: [orderByCondition],
    include,
  });

export const sortSpecialistsByName = specialistList =>
  specialistList.sort((a, b) => {
    const cur = a.lastName ? a.lastName : a.name;
    const next = b.lastName ? b.lastName : b.name;

    return cur.localeCompare(next);
  });
