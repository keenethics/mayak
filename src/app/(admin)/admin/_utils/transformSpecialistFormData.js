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
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  specializations: {
    connect: specializations?.length ? mapIdArrayToIdObjects(specializations) : undefined,
  },
  specializationMethods: {
    connect: specializationMethods?.length ? mapIdArrayToIdObjects(specializationMethods) : undefined,
  },
  addresses: {
    create: addresses?.length ? transformAddresses(addresses) : undefined,
  },
  therapies: {
    connect: therapies?.length ? mapIdArrayToIdObjects(therapies) : undefined,
  },
});
