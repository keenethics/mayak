import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({ organizationTypesIds, socialLink, clients, ...rest }) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const base = transformEditData(rest);

  const clientsWorkingWith = toConnectList(clients.workingWith);
  const clientsNotWorkingWith = toConnectList(clients.notWorkingWith);

  return {
    ...base,
    ...socialLink,
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    organizationTypesIds: undefined,
    clientsWorkingWith: {
      set: [],
      connect: clientsWorkingWith,
    },
    clientsWorkingWithIds: undefined,
    clientsNotWorkingWith: {
      set: [],
      connect: clientsNotWorkingWith,
    },
    clientsNotWorkingWithIds: undefined,
  };
}
