import { toConnectList, transformTherapyPrices } from './common';

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
  clients,
  ...rest
}) => {
  const { workingWith: clientsWorkingWith, notWorkingWith: clientsNotWorkingWith } = clients;

  return {
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
    clientsWorkingWith: {
      connect: clientsWorkingWith?.length ? toConnectList(clientsWorkingWith) : undefined,
    },
    clientsNotWorkingWith: {
      connect: clientsNotWorkingWith?.length ? toConnectList(clientsNotWorkingWith) : undefined,
    },
  };
};
