import { toConnectList, transformEditData, transformTherapyPrices } from './common';

export function transformOrganizationEditData({
  organizationTypesIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  ...rest
}) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const base = transformEditData(...rest, therapiesIds, therapyPrices);

  const newTherapiesPrices = transformTherapyPrices(therapiesIds, therapyPricesEdit);
  const currentTherapyPrices = toConnectList(therapyPrices, el => el.id);

  return {
    ...base,
    ...socialLink,
    therapyPrices: {
      create: newTherapiesPrices,
      deleteMany: currentTherapyPrices,
    },
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
  };
}
