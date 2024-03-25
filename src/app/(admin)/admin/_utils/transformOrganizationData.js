// import { toConnectList } from './common';

// this function transforms form data to proper prisma creation object
export function transformOrganizationData(data) {
  let addressesObject = {};
  let typesObject = {};
  let therapiesObject = {};

  const { socialLink, ...rest } = data;
  // const { workingWith: clientsWorkingWith, notWorkingWith: clientsNotWorkingWith } = data.clients;

  if (data?.addresses?.length > 0) {
    addressesObject = {
      create: data.addresses.map(address => ({
        ...address,
        district: { connect: { id: address.district } },
      })),
    };
  }

  if (data?.type?.length > 0) {
    typesObject = {
      connect: data.type.map(type => ({
        id: type,
      })),
    };
  }

  if (data?.therapies?.length > 0) {
    therapiesObject = {
      connect: data.therapies.map(therapy => ({
        id: therapy,
      })),
    };
  }

  return {
    ...rest,
    ...socialLink,
    addresses: addressesObject,
    type: typesObject,
    therapies: therapiesObject,
    clientsWorkingWith: {
      // connect: clientsWorkingWith?.length ? toConnectList(clientsWorkingWith) : undefined,
      connect: undefined,
    },
    clientsNotWorkingWith: {
      // connect: clientsNotWorkingWith?.length ? toConnectList(clientsNotWorkingWith) : undefined,
      connect: undefined,
    },
  };
}
