import { toConnectList, transformCreateData } from '@admin/_utils/common';

export const transformSpecialistData = ({ specializations, ...rest }) => {
  // console.log({ rest });
  const base = transformCreateData(rest);
  return {
    ...base,
    specializations: {
      connect: specializations?.length ? toConnectList(specializations) : undefined,
    },
  };
};
