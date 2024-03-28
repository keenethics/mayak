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
  //! this shit no work at all
  // clientCategory: {
  clientCategories: {
    orderBy: {
      name: 'asc',
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
  //! this shit no work at all
  // clientCategories: {
  //   orderBy: {
  //     name: 'asc',
  //   },
  // },
};
