export const specialistInclude = {
  specializations: {
    orderBy: {
      name: 'asc',
    },
  },
  therapies: true,
  therapyPrices: {
    include: {
      therapy: {
        select: {
          title: true,
        },
      },
    },
  },
  workTime: true,
  addresses: {
    include: {
      district: true,
    },
  },
};

export const organizationInclude = {
  type: {
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
  workTime: true,
};
