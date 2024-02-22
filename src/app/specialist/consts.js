export const include = {
  specializations: true,
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
