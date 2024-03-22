import { toConnectList, transformTherapyPrices, transformWorkTime } from './common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

export const transformData = ({
  socialLink,
  specializations,
  addresses,
  therapies,
  therapyPricesCreate,
  workTime,
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  specializations: {
    connect: specializations?.length ? toConnectList(specializations) : undefined,
  },
  addresses: {
    create: addresses?.length ? transformAddresses(addresses) : undefined,
  },
  therapies: {
    connect: therapies?.length ? toConnectList(therapies) : undefined,
  },
  therapyPrices: {
    create:
      therapies?.length && therapyPricesCreate ? transformTherapyPrices(therapies, therapyPricesCreate) : undefined,
  },
  therapyPricesCreate: undefined,
  workTime: {
    connectOrCreate: workTime?.length ? transformWorkTime(workTime) : undefined,
  },
});
