import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({ specializationsIds, specializationMethodsIds, socialLink, ...rest }) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const specializationMethodsToConnect = toConnectList([].concat(...Object.values(specializationMethodsIds)));
  const base = transformEditData(rest);

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
    specializationsIds: undefined,
  };
}
