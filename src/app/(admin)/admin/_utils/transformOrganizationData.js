import { toConnectList, transformTherapyPrices } from './common';

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

// this function transforms form data to proper prisma creation object
export const transformOrganizationData = ({
  socialLink,
  addresses,
  therapies,
  therapyPricesCreate,
  type,
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  type: { connect: type?.map(el => ({ id: el })) },

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

// export function transformOrganizationData(data) {
//   let addressesObject = {};
//   let typesObject = {};
//   let therapiesObject = {};

//   if (data?.addresses?.length > 0) {
//     addressesObject = {
//       create: data.addresses.map(address => ({
//         ...address,
//         district: { connect: { id: address.district } },
//       })),
//     };
//   }

//   if (data?.type?.length > 0) {
//     typesObject = {
//       connect: data.type.map(type => ({
//         id: type,
//       })),
//     };
//   }

//   if (data?.therapies?.length > 0) {
//     therapiesObject = {
//       connect: data.therapies.map(therapy => ({
//         id: therapy,
//       })),
//     };
//   }

//   return {
//     addresses: addressesObject,
//     type: typesObject,
//     therapies: therapiesObject,
//   };
// }
