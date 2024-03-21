import { toConnectList, transformEditData, transformTherapyPrices } from './common';

export function transformSpecialistEditData({
  specializationsIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  ...rest
}) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const base = transformEditData({ ...rest, therapiesIds, therapyPrices });

  const newTherapiesPrices = transformTherapyPrices(therapiesIds, therapyPricesEdit);
  const currentTherapyPrices = toConnectList(therapyPrices, el => el.id);

  return {
    ...base,
    ...socialLink,
    therapyPrices: {
      create: newTherapiesPrices,
      deleteMany: currentTherapyPrices,
    },
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationsIds: undefined,
  };
}
