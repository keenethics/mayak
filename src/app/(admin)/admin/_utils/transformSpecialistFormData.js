import { toConnectList, transformTherapyPrices } from './common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

const transformClientCategories = arr =>
  arr.map(it => ({
    ...it,
    clientCategory: { connect: { id: it.clientCategory } },
  }));

export const transformData = ({
  clientCategories,
  socialLink,
  specializations,
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
  clientCategoriesOnSpecialists: {
    create: clientCategories?.length ? transformClientCategories(clientCategories) : undefined,
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
