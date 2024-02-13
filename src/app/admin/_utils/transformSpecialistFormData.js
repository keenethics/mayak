const mapIdArrayToIdObjects = IdList => IdList.map(id => ({ id }));

const transformPlacesOfWork = placesArray => {
  const mappedPlaces = placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

  return [
    {
      addresses: {
        create: mappedPlaces,
      },
    },
  ];
};

export const transformDraftData = data => ({
  ...data,
  specializations: {
    connect: mapIdArrayToIdObjects(data.specializations),
  },
});

export const transformFullData = data => ({
  ...data,
  specializations: {
    connect: mapIdArrayToIdObjects(data.specializations),
  },
  placesOfWork: {
    create: transformPlacesOfWork(data.placesOfWork),
  },
  therapies: {
    connect: mapIdArrayToIdObjects(data.therapies),
  },
});
