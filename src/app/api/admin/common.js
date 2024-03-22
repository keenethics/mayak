import { RESOURCES , WEEKDAYS_TRANSLATION } from '@admin/_lib/consts';
import { auth } from '@/lib/auth';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { transformWorkTime } from '@/utils/common';

export const MODEL_SEARCH_FIELDS = {
  [RESOURCES.event]: ['title', 'organizerName'],
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.organization]: ['name'],
};

export const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
    therapies: { select: { id: true, type: true, title: true } },
    therapyPrices: {
      select: {
        id: true,
        price: true,
        therapy: {
          select: {
            id: true,
          },
        },
      },
    },
    specializations: { select: { id: true, name: true } },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
    workTime: { select: { weekDay: true, time: true, isDayOff: true } },
  },
  [RESOURCES.organization]: {
    therapies: { select: { id: true, type: true, title: true } },
    type: { select: { id: true, name: true } },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
    workTime: { select: { weekDay: true, time: true, isDayOff: true } },
  },
  [RESOURCES.event]: {
    additionalLink: { select: { label: true, link: true } },
    tags: { select: { name: true } },
  },
};

export function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = MODEL_SEARCH_FIELDS[modelName].map(field => ({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}

export function transformServiceProvider(instance, modelName) {
  // ReferenceInput doesn't see included fields if it returned as new object, so we need to transform current
  // React Admin issues
  if (modelName === RESOURCES.organization) {
    // eslint-disable-next-line no-param-reassign
    instance.organizationTypesIds = instance.type.map(orgType => orgType.id);
  } else {
    // eslint-disable-next-line no-param-reassign
    instance.specializationsIds = instance.specializations.map(specialization => specialization.id);
  }

  if (instance?.workTime?.length) {
    // eslint-disable-next-line no-param-reassign
    instance.workTime = transformWorkTime(instance.workTime, WEEKDAYS_TRANSLATION);
  }

  // eslint-disable-next-line no-param-reassign
  instance.therapiesIds = instance.therapies.map(therapy => therapy.id);
  // eslint-disable-next-line no-param-reassign
  instance.addressesIds = instance.addresses.map(address => address.id);
  // eslint-disable-next-line no-param-reassign
  instance.addresses = instance?.addresses?.map(address => ({
    ...address,
    districtId: address.district.id,
  }));
}

export function withErrorHandlerAndAuth(handler) {
  return auth(
    withErrorHandler(req => {
      if (!req.auth) throw new NotAuthorizedException();
      return handler(req);
    }),
  );
}
