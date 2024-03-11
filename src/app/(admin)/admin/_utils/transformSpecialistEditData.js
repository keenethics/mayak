import { FormatOfWork } from '@prisma/client';

export const transformSpecialistEditData = data => {
  const therapiesToConnect = data.therapiesIds?.map(id => ({ id })) ?? [];
  const specializationsToConnect = data.specializationsIds?.map(id => ({ id }));
  const addressesToConnect = data.addresses?.filter(address => address.id).map(address => ({ id: address.id })) ?? [];
  const addressesToCreate =
    data.addresses
      ?.filter(address => !address.id)
      .map(address => ({
        ...address,
        district: { connect: { id: address.districtId } },
        districtId: undefined,
      })) ?? [];

  const unselectedAddresses =
    data.addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete =
    data.formatOfWork !== FormatOfWork.ONLINE ? unselectedAddresses.map(id => ({ id })) ?? [] : {};

  return {
    ...data,
    specializationsIds: undefined,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};
