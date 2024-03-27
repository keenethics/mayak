import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({
  expertSpecializationIds,
  organizationTypesIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  ...rest
}) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const expertSpecializationsToConnect = toConnectList(expertSpecializationIds);
  const base = transformEditData({ ...rest, therapiesIds, therapyPrices, therapyPricesEdit });

  return {
    ...base,
    ...socialLink,
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    expertSpecializations: {
      set: [],
      connect: expertSpecializationsToConnect,
    },
    organizationTypesIds: undefined,
  };
}
