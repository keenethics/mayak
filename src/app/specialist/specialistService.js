import { prisma } from '@/lib/db';

export const getAll = async () => {
  try {
    // pagination will be implemented later
    const data = await prisma.specialist.findMany({
      include: {
        specializations: true,
        therapies: true,
        placesOfWork: true,
      },
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getById = async ({ id }) => {
  try {
    const data = await prisma.specialist.findUnique({
      where: {
        id,
      },
      include: {
        specializations: true,
        therapies: true,
        placesOfWork: true,
      },
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
