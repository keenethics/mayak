'use server';

import { prisma } from '@/lib/db';

export const getDistrictsList = async () => {
  const districtsList = await prisma.district.findMany({
    orderBy: { name: 'desc' },
  });
  const defaultOption = { id: 'all-districts', name: 'Усі' };
  return [defaultOption, ...districtsList];
};
