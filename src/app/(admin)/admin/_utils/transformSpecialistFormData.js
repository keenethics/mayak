const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

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

export const transformData = data => {
  const { socialLink, specializations, addresses, therapies, clientCategories, ...rest } = data;
  return {
    ...rest,
    ...socialLink,
    specializations: {
      connect: specializations?.length ? mapIdArrayToIdObjects(specializations) : undefined,
    },
    clientCategoriesOnSpecialists: {
      create: clientCategories?.length ? transformClientCategories(clientCategories) : undefined,
    },
    addresses: {
      create: addresses?.length ? transformAddresses(addresses) : undefined,
    },
    therapies: {
      connect: therapies?.length ? mapIdArrayToIdObjects(therapies) : undefined,
    },
  };
};
