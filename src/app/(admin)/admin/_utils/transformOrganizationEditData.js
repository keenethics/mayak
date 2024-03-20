import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({ organizationTypesIds, socialLink, ...rest }) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const base = transformEditData(rest);

  return {
    ...base,
    ...socialLink,
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    organizationTypesIds: undefined,
  };
}
