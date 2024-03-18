import { toConnectList, transformAddresses, transformTherapiesCuts } from '@admin/_utils/common';

export const transformOrganizationData = data => ({
  ...data,
  type: {
    connect: data.type?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapiesCuts: {
    create: data.therapiesCuts?.length ? transformTherapiesCuts({ cuts: data.therapiesCuts, cutsIds: [] }) : undefined,
  },
});
