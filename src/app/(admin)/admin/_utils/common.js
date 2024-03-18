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

export const transformTherapiesCuts = ({ cuts, cutsIds }) => {
  const cutsToUpdate = [];
  const cutsToCreate = [];
  const cutsToDelete = toConnectList(cutsIds.filter(cutId => !cuts.some(cut => cut.id === cutId)));

  cuts.forEach(cut => {
    if (cut.id) {
      cutsToUpdate.push({
        where: { id: cut.id },
        data: {
          therapy: { connect: { id: cut.therapy.id } },
          requests: { set: [], connect: toConnectList(cut.requestsIds) },
        },
      });
    } else {
      cutsToCreate.push({
        therapy: { connect: { id: cut.therapy.id } },
        requests: { connect: toConnectList(cut.requestsIds) },
      });
    }
  });

  return {
    update: cutsToUpdate.length ? cutsToUpdate : undefined,
    deleteMany: cutsToDelete,
    create: cutsToCreate,
  };
};

export const transformEditData = ({
  addresses,
  addressesIds,
  therapiesCuts,
  therapiesCutsIds,
  formatOfWork,
  ...rest
}) => {
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
    therapiesCutsIds: undefined,
    addressesIds: undefined,
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
    therapiesCuts: transformTherapiesCuts({ cuts: therapiesCuts, cutsIds: therapiesCutsIds }),
  };
};
