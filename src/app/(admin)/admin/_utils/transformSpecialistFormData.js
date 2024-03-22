import { toConnectList, transformTherapyPrices } from './common';

const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

export const transformData = ({
  socialLink,
  specializations,
  specializationMethods,
  addresses,
  therapies,
  therapyPricesCreate,
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  specializations: {
    connect: specializations?.length ? toConnectList(specializations) : undefined,
  },
  specializationMethods: {
    connect: specializationMethods?.length ? mapIdArrayToIdObjects(specializationMethods) : undefined,
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
});
