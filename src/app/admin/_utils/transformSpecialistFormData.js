const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

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

export const transformData = data => {
  console.log({ data });

  return {
    ...data,
    specializations: {
      connect: data.specializations?.length ? mapIdArrayToIdObjects(data.specializations) : undefined,
    },
    placesOfWork: {
      create: data.placesOfWork?.length ? transformPlacesOfWork(data.placesOfWork) : undefined,
    },
    therapies: {
      connect: data.therapies?.length ? mapIdArrayToIdObjects(data.therapies) : undefined,
    },
  };
};
