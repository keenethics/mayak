export const specialistInclude = {
  specializations: {
    orderBy: {
      name: 'asc',
    },
  },
  supportFocuses: {
    include: {
      therapy: true,
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
  supportFocuses: {
    include: {
      therapy: true,
    },
  },
  addresses: {
    include: {
      district: true,
    },
  },
};
