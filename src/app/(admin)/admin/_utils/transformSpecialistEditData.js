import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({
  specializationsIds,
  specializationMethodsIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  ...rest
}) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const specializationMethodsToConnect = toConnectList([].concat(...Object.values(specializationMethodsIds)));

  const base = transformEditData({ ...rest, therapiesIds, therapyPrices });

  return {
    ...base,
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationMethods: {
      set: [],
      connect: specializationMethodsToConnect,
    },
    specializationMethodsIds: undefined,
    specializationsIds: undefined,
  };
}
