const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

export const transformData = ({ socialLink, ...rest }) => ({
  ...rest,
  ...socialLink,
  specializations: {
    connect: rest.specializations?.length ? mapIdArrayToIdObjects(rest.specializations) : undefined,
  },
  addresses: {
    create: rest.addresses?.length ? transformAddresses(rest.addresses) : undefined,
  },
  therapies: {
    connect: rest.therapies?.length ? mapIdArrayToIdObjects(rest.therapies) : undefined,
  },
});
