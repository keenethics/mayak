import { RESOURCES } from '@/app/admin/_lib/consts';
import { auth } from '@/lib/auth';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { withErrorHandler } from '@/lib/errors/errorHandler';

const MODEL_SEARCH_FIELDS = {
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.organization]: ['name'],
};

export const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
    therapies: { select: { name: true } },
    specializations: { select: { name: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { name: true } },
      },
    },
  },
  [RESOURCES.organization]: {
    therapies: { select: { name: true } },
    type: { select: { name: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { name: true } },
      },
    },
  },
};

export function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = MODEL_SEARCH_FIELDS[modelName].map(field => ({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}

export function withErrorHandlerAndAuth(handler) {
  return auth(
    withErrorHandler(req => {
      if (!req.auth) throw new NotAuthorizedException();
      return handler(req);
    }),
  );
}
