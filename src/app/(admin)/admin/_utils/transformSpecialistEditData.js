import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({ specializationsIds, socialLink, ...rest }) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const base = transformEditData(rest);

  return {
    ...base,
    ...socialLink,
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationsIds: undefined,
  };
}
