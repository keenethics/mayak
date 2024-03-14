const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

const transformAddresses = placesArray =>
  placesArray.map(place => ({
    ...place,
    district: { connect: { id: place.district } },
  }));

const transformTherapyPrices = (therapies, therapyPrices) => {
  const result = [];
  therapies?.forEach(el => {
    if (therapyPrices[el] !== null) {
      result.push({
        therapy: { connect: { id: el } },
        price: therapyPrices[el],
      });
    }
  });
  return result;
};
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
  therapyPrices: {
    create:
      data.therapies?.length && data.therapyPrices
        ? transformTherapyPrices(data.therapies, data.therapyPrices)
        : undefined,
  },
});
