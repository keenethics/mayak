import { RESOURCES } from '@admin/_lib/consts';
import { auth } from '@/lib/auth';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const MODEL_SEARCH_FIELDS = {
  [RESOURCES.event]: ['title', 'organizerName'],
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.organization]: ['name'],
};

export const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        therapy: { select: { id: true, title: true, type: true } },
        requests: true,
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
  },
  [RESOURCES.organization]: {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        therapy: { select: { id: true, title: true, type: true } },
        requests: true,
      },
    },
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
  },
  [RESOURCES.event]: {
    additionalLink: { select: { label: true, link: true } },
    tags: { select: { name: true } },
  },
  [RESOURCES.therapy]: {
    requests: { select: { id: true, name: true } },
    _count: {
      select: { requests: true },
    },
  },
  [RESOURCES.method]: {
    specialization: { select: { name: true } },
  },
};

export function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = MODEL_SEARCH_FIELDS[modelName].map(field => ({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}

/* eslint-disable no-param-reassign */
export function transformServiceProvider(instance, modelName) {
  // ReferenceInput doesn't see included fields if it returned as new object, so we need to transform current
  // React Admin issues
  if (modelName === RESOURCES.organization) {
    instance.organizationTypesIds = instance.type.map(orgType => orgType.id);
  } else {
    instance.specializationsIds = instance.specializations.map(specialization => specialization.id);
  }
  instance.supportFocusesIds = instance.supportFocuses.map(focus => focus.id);
  instance.supportFocuses = instance?.supportFocuses?.map(focus => ({
    ...focus,
    requestsIds: focus.requests.map(request => request.id),
  }));
  instance.addresses = instance?.addresses?.map(address => ({
    ...address,
    districtId: address.district.id,
  }));
  instance.addressesIds = instance.addresses.map(address => address.id);
}
/* eslint-enable no-param-reassign */

export function withErrorHandlerAndAuth(handler) {
  return auth(
    withErrorHandler(req => {
      if (!req.auth) throw new NotAuthorizedException();
      return handler(req);
    }),
  );
}
