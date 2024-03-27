import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({
  specializationsIds,
  specializationMethodsIds,
  socialLink,
  therapyPrices,
  therapiesIds,
  ...rest
}) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const specializationMethodsToConnect = toConnectList([].concat(...Object.values(specializationMethodsIds)));

  const base = transformEditData({ ...rest, therapiesIds, therapyPrices });

  return {
    ...base,
    ...socialLink,
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
