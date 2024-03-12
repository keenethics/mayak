import { FormatOfWork } from '@prisma/client';

export const capitalizeFirstLetter = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);

export const getChoicesList = (list, translations) =>
  list.map(item => ({
    id: item,
    name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item,
  }));

export function toConnectList(list, cb) {
  return list?.map(id => ({ id: cb?.(id) ?? id })) ?? [];
}

function transformAddresses(addresses) {
  return (
    addresses
      ?.filter(address => !address.id)
      .map(address => ({
        ...address,
        district: { connect: { id: address.districtId } },
        districtId: undefined,
      })) ?? []
  );
}

export const transformEditData = ({ therapiesIds, addresses, addressesIds, formatOfWork, ...rest }) => {
  const therapiesToConnect = toConnectList(therapiesIds);
  const addressesToConnect = toConnectList(
    addresses?.filter(address => address.id),
    address => address.id,
  );
  const addressesToCreate = transformAddresses(addresses);

  const unselectedAddresses =
    addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete = formatOfWork !== FormatOfWork.ONLINE ? toConnectList(unselectedAddresses) : {};

  return {
    ...rest,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};
