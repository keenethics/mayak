import { FormatOfWork } from '@prisma/client';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';

export function createSearchEntryFilter(entityFilter, query, searchType) {
  const defaultFilter = { OR: [{ specialist: entityFilter }, { organization: entityFilter }] };

  if (!query) {
    return defaultFilter;
  }

  switch (searchType) {
    case 'request': {
      Object.assign(entityFilter, {
        ...entityFilter,
        supportFocuses: {
          some: {
            requests: {
              some: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      });
      return defaultFilter;
    }

    case 'specialist':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        specialist: entityFilter,
      };
    case 'organization':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        organization: entityFilter,
      };
    default:
      return defaultFilter;
  }
}

export function createSearchSyncFilter(query, searchType) {
  return createSearchEntryFilter({ isActive: true }, query, searchType);
}

export function createEntityFilter({ type, requests, format, districts }) {
  return {
    isActive: true,
    therapies: type && {
      some: {
        type,
      },
    },
    supportFocuses: requests && {
      some: {
        requests: {
          some: {
            OR: requests.map(request => ({
              id: request,
            })),
          },
        },
      },
    },
    OR: format && [{ formatOfWork: FormatOfWork.BOTH }, { formatOfWork: format }],
    addresses: districts && {
      some: {
        OR: districts.map(id => ({
          districtId: id,
        })),
      },
    },
  };
}

export function getSearchFilterQueryParams(req) {
  return getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      // TODO: uncomment pagination once needed
      // take: 10,
      // skip: 0,
      searchSync: false,
      searchType: undefined,
      query: undefined,
      districts: undefined,
      requests: undefined,
    },
    params => ({
      ...params,
      // take: parseInt(params.take, 10),
      // skip: parseInt(params.skip, 10),
      districts: typeof params.district === 'string' ? [params.district] : params.district,
      district: undefined,
      requests: typeof params.request === 'string' ? [params.request] : params.request,
      request: undefined,
    }),
  );
}
