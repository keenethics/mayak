import { toConnectList, transformCreateData } from '@admin/_utils/common';

export const transformOrganizationData = ({ type, ...rest }) => {
  const base = transformCreateData(rest);
  return {
    ...base,
    type: {
      connect: type?.length ? toConnectList(type) : undefined,
    },
  };
};
