import { toConnectList, transformAddresses, transformCreateTherapiesCuts } from '@admin/_utils/common';

export const transformData = data => ({
  ...data,
  specializations: {
    connect: data.specializations?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapiesCuts: {
    create: data.therapiesCuts?.length ? transformCreateTherapiesCuts(data.therapiesCuts) : undefined,
  },
});
