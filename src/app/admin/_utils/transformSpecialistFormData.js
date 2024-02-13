import { mapIdArrayToIdObjects } from '@/app/admin/_utils/mapIdArrayToIdObjects';

function transformPlacesOfWork(placesArray) {
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
}

function transformDraftData(data) {
  return {
    ...data,
    specializations: {
      connect: mapIdArrayToIdObjects(data.specializations),
    },
  };
}

function transformFullData(data) {
  return {
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
  };
}

export { transformDraftData, transformFullData };
