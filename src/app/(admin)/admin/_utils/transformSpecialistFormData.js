// const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));
import { toConnectList } from '@admin/_utils/common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

const transformTherapiesCuts = cuts =>
  cuts.map(cut => ({
    therapy: { connect: { id: cut.therapyId } },
    requests: { connect: toConnectList(cut.requests) },
  }));

export const transformData = data => ({
  ...data,
  specializations: {
    connect: data.specializations?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapiesCuts: {
    create: data.therapiesCuts?.length ? transformTherapiesCuts(data.therapiesCuts) : undefined,
  },
});
