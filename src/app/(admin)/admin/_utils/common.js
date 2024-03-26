import { FormatOfWork } from '@prisma/client';

export const capitalize = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);

export const getChoicesList = (list, translations) =>
  list.map(item => ({
    id: item,
    name: capitalize(translations[item.toLowerCase()]) ?? item,
  }));

export function toConnectList(list, cb) {
  return list?.map(id => ({ id: cb?.(id) ?? id })) ?? [];
}

export function transformAddresses({ addresses, type = 'create' }) {
  return (
    addresses
      ?.filter(address => !address.id)
      .map(({ district, districtId, ...rest }) => ({
        ...rest,
        district: { connect: { id: type === 'create' ? district : districtId } },
        districtId: undefined,
      })) ?? []
  );
}

export const transformSupportFocuses = ({ focuses, focusesIds }) => {
  const focusesToUpdate = [];
  const focusesToCreate = [];
  const focusesToDelete = toConnectList(focusesIds.filter(cutId => !focuses.some(focus => focus.id === cutId)));

  focuses.forEach(focus => {
    if (focus.id) {
      focusesToUpdate.push({
        where: { id: focus.id },
        data: {
          price: focus.price,
          therapy: { connect: { id: focus.therapy.id } },
          requests: { set: [], connect: toConnectList(focus.requestsIds) },
        },
      });
    } else {
      focusesToCreate.push({
        price: focus.price,
        therapy: { connect: { id: focus.therapy.id } },
        requests: { connect: toConnectList(focus.requestsIds) },
      });
    }
  });

  return {
    update: focusesToUpdate.length ? focusesToUpdate : undefined,
    deleteMany: focusesToDelete.length ? focusesToDelete : undefined,
    create: focusesToCreate.length ? focusesToCreate : undefined,
  };
};

export const transformCreateData = ({ addresses, supportFocuses, socialLink, ...rest }) => ({
  ...rest,
  ...socialLink,
  addresses: {
    create: addresses?.length ? transformAddresses({ addresses, type: 'create' }) : undefined,
  },
  supportFocuses: transformSupportFocuses({ focuses: supportFocuses, focusesIds: [] }),
});

export const transformEditData = ({
  addresses,
  addressesIds,
  supportFocuses,
  supportFocusesIds,
  formatOfWork,
  socialLink,
  ...rest
}) => {
  const addressesToConnect = toConnectList(
    addresses?.filter(address => address.id),
    address => address.id,
  );
  const addressesToCreate = transformAddresses({ addresses, type: 'edit' });

  const unselectedAddresses =
    addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete = formatOfWork !== FormatOfWork.ONLINE ? toConnectList(unselectedAddresses) : {};

  return {
    ...rest,
    ...socialLink,
    formatOfWork,
    supportFocusesIds: undefined,
    addressesIds: undefined,
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
    supportFocuses: transformSupportFocuses({ focuses: supportFocuses, focusesIds: supportFocusesIds }),
  };
};
