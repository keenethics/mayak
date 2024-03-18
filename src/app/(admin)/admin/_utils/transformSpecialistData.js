import { toConnectList, transformAddresses, transformTherapiesCuts } from '@admin/_utils/common';

export const transformData = data => ({
  ...data,
  specializations: {
    connect: data.specializations?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapiesCuts: data.therapiesCuts?.length
    ? transformTherapiesCuts({ cuts: data.therapiesCuts, cutsIds: [] })
    : undefined,
});
