import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({ specializationsIds, ...rest }) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const base = transformEditData(rest);
  return {
    ...base,
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationsIds: undefined,
  };
}
