export const include = {
  specializations: {
    orderBy: {
      name: 'asc',
    },
  },
  therapies: true,
  placesOfWork: {
    include: {
      addresses: {
        include: {
          district: true,
        },
      },
    },
  },
};
