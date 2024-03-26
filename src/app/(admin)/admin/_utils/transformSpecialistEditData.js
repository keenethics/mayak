import { toConnectList, transformEditData } from './common';

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

  return {
    ...base,
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationsIds: undefined,
  };
}
