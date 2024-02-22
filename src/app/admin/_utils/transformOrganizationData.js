// this function transforms form data to proper prisma creation object
export function transformOrganizationData(data) {
  let addressesObject = {};
  let typesObject = {};
  let therapiesObject = {};

  if (data?.addresses?.length > 0) {
    addressesObject = {
      create: data.addresses.map(address => ({
        fullAddress: address.fullAddress,
        district: { connect: { name: address.district } },
      })),
    };
  }

  if (data?.type?.length > 0) {
    typesObject = {
      connect: data.type.map(type => ({
        name: type,
      })),
    };
  }

  if (data?.therapies?.length > 0) {
    therapiesObject = {
      connect: data.therapies.map(therapy => ({
        name: therapy,
      })),
    };
  }

  return {
    ...data,
    addresses: addressesObject,
    type: typesObject,
    therapies: therapiesObject,
  };
}
