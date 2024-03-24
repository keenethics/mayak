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
  therapyPrices: {
    include: {
      therapy: {
        select: {
          title: true,
        },
      },
    },
  },
  addresses: {
    include: {
      district: true,
    },
  },
};
