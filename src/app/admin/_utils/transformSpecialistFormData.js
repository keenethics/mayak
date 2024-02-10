import { mapIdArrayToIdObjects } from '@/app/admin/_utils/mapIdArrayToIdObjects';

const transformPlacesOfWork = (placesArray) => {
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

const tranformDraftData = data => ({
  ...data,
  specializations: {
    connect: mapIdArrayToIdObjects(data.specializations),
  },
});

const transformFullData = data => ({
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

export { tranformDraftData, transformFullData };
