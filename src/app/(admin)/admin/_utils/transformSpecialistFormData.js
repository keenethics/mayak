const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

// export const transformData = data => {
//   console.log({ transformationData: data });
//   return {
//     ...data,
//     specializations: {
//       connect: data.specializations?.length ? mapIdArrayToIdObjects(data.specializations) : undefined,
//     },
//     addresses: {
//       create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
//     },
//     therapies: {
//       connect: data.therapies?.length ? mapIdArrayToIdObjects(data.therapies) : undefined,
//     },
//   };
// };

export const transformData = data => ({
  ...data,
  specializations: {
    connect: data.specializations?.length ? mapIdArrayToIdObjects(data.specializations) : undefined,
  },
  addresses: {
    create: data.addresses?.length ? transformAddresses(data.addresses) : undefined,
  },
  therapies: {
    connect: data.therapies?.length ? mapIdArrayToIdObjects(data.therapies) : undefined,
  },
});
