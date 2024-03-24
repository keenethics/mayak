import { toConnectList, transformEditData, transformTherapyPrices } from './common';

export function transformSpecialistEditData({
  specializationsIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  clients,
  ...rest
}) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const base = transformEditData({ ...rest, therapiesIds, therapyPrices });

  const newTherapiesPrices = transformTherapyPrices(therapiesIds, therapyPricesEdit);
  const currentTherapyPrices = toConnectList(therapyPrices, el => el.id);

  const clientsWorkingWith = toConnectList(clients.workingWith);
  const clientsNotWorkingWith = toConnectList(clients.notWorkingWith);

  return {
    ...base,
    ...socialLink,
    therapyPrices: {
      create: newTherapiesPrices,
      deleteMany: currentTherapyPrices,
    },
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationsIds: undefined,
    clientsWorkingWith: {
      set: [],
      connect: clientsWorkingWith,
    },
    clientsWorkingWithIds: undefined,
    clientsNotWorkingWith: {
      set: [],
      connect: clientsNotWorkingWith,
    },
    clientsNotWorkingWithIds: undefined,
  };
}
