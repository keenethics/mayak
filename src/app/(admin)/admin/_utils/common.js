import { FormatOfWork } from '@prisma/client';
import { weekDaysTranslation } from '@/lib/consts';

export const capitalizeFirstLetter = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);

export const getChoicesList = (list, translations) =>
  list.map(item => ({
    id: item,
    name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item,
  }));

export function toConnectList(list, cb) {
  return list?.map(id => ({ id: cb?.(id) ?? id })) ?? [];
}

export function transformTherapyPrices(therapies, therapyPrices) {
  return (
    therapies
      ?.filter(el => therapyPrices[el] !== null)
      .map(el => ({
        therapy: { connect: { id: el } },
        price: therapyPrices[el],
      })) ?? []
  );
}

export function isSpecifiedWorkTime(workTime) {
  return workTime.some(day => day.isDayOff === false || day.isDayOff || day.time);
}

export function transformWorkTimeCreate(workTime) {
  const specified = isSpecifiedWorkTime(workTime);
  if (!specified) return {};
  return workTime.map(day => {
    const { weekDay, time, isDayOff } = day;
    const workTimeObj = {
      weekDay: Object.keys(weekDaysTranslation).find(key => weekDaysTranslation[key] === weekDay),
      isDayOff: !!isDayOff, // convert to false if it's null/undefined
      time: time || '',
    };
    return {
      create: workTimeObj,
      where: { weekDay_time_isDayOff: workTimeObj },
    };
  });
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

export const transformEditData = ({ therapiesIds, addresses, addressesIds, formatOfWork, workTime, ...rest }) => {
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
    formatOfWork,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    therapyPricesEdit: undefined,
    workTime: {
      set: [],
      connectOrCreate: transformWorkTimeCreate(workTime),
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};
