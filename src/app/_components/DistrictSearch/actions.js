'use server';

import { prisma } from '@/lib/db';

export const getDistrictsList = async () => await prisma.district.findMany();
