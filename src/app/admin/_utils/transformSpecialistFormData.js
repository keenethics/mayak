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

export const transformDaysOfWork = daysOfWork => {
  const daysOfWorkTransformed = [];
  daysOfWork.forEach(dayOfWork => {
    if (dayOfWork.daysOfWeek) {
      daysOfWorkTransformed.push(
        ...dayOfWork.daysOfWeek.map(dayOfWeek => ({
          dayOfWeek,
          timeRanges: dayOfWork.timeRanges.map(el => el.timeRange),
        })),
      );
    }
  });
  return daysOfWorkTransformed;
};
export const transformData = data => ({
  ...data,
  daysOfWork: {
    create: data.daysOfWork?.length ? transformDaysOfWork(data.daysOfWork) : undefined,
  },
  specializations: {
    connect: data.specializations?.length ? mapIdArrayToIdObjects(data.specializations) : undefined,
  },
  placesOfWork: {
    create: data.placesOfWork?.length ? transformPlacesOfWork(data.placesOfWork) : undefined,
  },
  therapies: {
    connect: data.therapies?.length ? mapIdArrayToIdObjects(data.therapies) : undefined,
  },
});
