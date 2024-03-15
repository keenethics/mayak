import { toConnectList, transformAddresses, transformCreateTherapiesCuts } from '@admin/_utils/common';

export const transformOrganizationData = data => ({
  ...data,
  type: {
    connect: data.type?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapiesCuts: {
    create: data.therapiesCuts?.length ? transformCreateTherapiesCuts(data.therapiesCuts) : undefined,
  },
});
