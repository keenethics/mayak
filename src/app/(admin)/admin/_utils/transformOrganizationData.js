import { toConnectList, transformTherapyPrices } from './common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

// this function transforms form data to proper prisma creation object
export const transformOrganizationData = ({
  socialLink,
  organizationTypesIds,
  addresses,
  therapies,
  therapyPricesCreate,
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  type: { connect: organizationTypesIds?.map(el => ({ id: el })) },

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