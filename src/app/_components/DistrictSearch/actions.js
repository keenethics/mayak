'use server';

import { prisma } from '@/lib/db';

export const getDistrictsList = () => prisma.district.findMany();
