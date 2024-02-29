export const include = {
  specializations: {
    orderBy: {
      name: 'asc',
    },
  },
  therapies: true,
  addresses: {
    include: {
      district: true,
    },
  },
};
