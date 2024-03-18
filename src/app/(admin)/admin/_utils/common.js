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

export const transformCreateTherapiesCuts = cuts =>
  cuts.map(cut => ({
    therapy: { connect: { id: cut.therapyId } },
    requests: { connect: toConnectList(cut.requests) },
  }));

// export const transformEditTherapiesCuts = cuts =>
//   cuts.map(cut => ({ id: cut.id, requests: { connect: toConnectList(cut.requestsIds) } }));

export function transformAddresses(addresses) {
  return (
    addresses
      ?.filter(address => !address.id)
      .map(address => ({
        ...address,
        district: { connect: { id: address.district } },
        districtId: undefined,
      })) ?? []
  );
}

export const transformEditData = ({ addresses, addressesIds, formatOfWork, ...rest }) => {
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
    formatOfWork,
    therapiesIds: undefined,
    addressesIds: undefined,
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};
