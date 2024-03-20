const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

// this function transforms form data to proper prisma creation object
export function transformOrganizationData(data) {
  let addressesObject = {};
  let typesObject = {};
  let therapiesObject = {};

  const { socialLink, ...rest } = data;

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
    expertSpecializations: {
      connect: rest.expertSpecializations?.length ? mapIdArrayToIdObjects(rest.expertSpecializations) : undefined,
    },
    addresses: addressesObject,
    type: typesObject,
    therapies: therapiesObject,
  };
}
