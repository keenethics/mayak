import {
  toConnectList,
  transformEditData,
  // transformTherapyPrices
} from './common';

export function transformOrganizationEditData({ expertSpecializationIds, organizationTypesIds, socialLink, ...rest }) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const expertSpecializationsToConnect = toConnectList(expertSpecializationIds);
  const base = transformEditData(rest);

  return {
    ...base,
    ...socialLink,
    // therapyPrices: {
    //   create: newTherapiesPrices,
    //   deleteMany: currentTherapyPrices,
    // },
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    expertSpecializations: {
      set: [],
      connect: expertSpecializationsToConnect,
    },
    organizationTypesIds: undefined,
  };
}
