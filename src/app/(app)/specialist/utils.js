import { prisma } from '@/lib/db';
import { specialistInclude } from '@/app/(app)/specialist/consts';

export const getSpecialist = async ({ id }) =>
  prisma.specialist.findUnique({
    where: {
      id,
    },
    include: specialistInclude,
  });