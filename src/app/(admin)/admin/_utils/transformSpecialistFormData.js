import { toConnectList, transformTherapyPrices } from './common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

export const transformData = data => ({
  ...data,
  specializations: {
    connect: data.specializations?.length ? toConnectList(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapies: {
    connect: data.therapies?.length ? toConnectList(data.therapies) : undefined,
  },
  therapyPrices: {
    create:
      data.therapies?.length && data.therapyPricesCreate
        ? transformTherapyPrices(data.therapies, data.therapyPricesCreate)
        : undefined,
  },
  therapyPricesCreate: undefined,
});
