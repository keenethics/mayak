export function calculateInclude(modelName) {
  if (modelName === 'Specialist') {
    return {
      therapies: { select: { name: true } },
      specializations: { select: { name: true } },
      placesOfWork: {
        select: {
          addresses: {
            select: {
              nameOfClinic: true,
              fullAddress: true,
              district: { select: { name: true } },
            },
          },
        },
      },
    };
  }
  return 1;
}
