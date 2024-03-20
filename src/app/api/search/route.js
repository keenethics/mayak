import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';

function buildFilter(entityFilter, query, searchType) {
  const defaultFilter = { OR: [{ specialist: entityFilter }, { organization: entityFilter }] };

  if (!query) {
    return defaultFilter;
  }

  switch (searchType) {
    case 'request':
      Object.assign(entityFilter, {
        therapiesCuts: {
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

async function handleSearch(entityFilter, query, searchType) {
  const sharedInclude = {
    therapies: { select: { title: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
      },
    },
  };

  const filter = buildFilter(entityFilter, query, searchType);

  const totalCount = await prisma.searchEntry.count({ where: filter });

  const searchEntries = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializations: { select: { name: true } },
        },
      },
      organization: {
        include: {
          ...sharedInclude,
          type: { select: { name: true } },
        },
      },
    },
    where: filter,
    orderBy: {
      sortString: 'asc',
    },
    // take,
    // skip,
  });

  const data = searchEntries.map(entry => (entry.specialist ? entry.specialist : entry.organization));

  return NextResponse.json({
    totalCount,
    data,
  });
}

async function handleSearchSync(entityFilter, query, searchType) {
  let mappedSyncItems = [];
  if (searchType === 'request') {
    const syncItems = await prisma.request.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
    mappedSyncItems = syncItems.map(el => ({
      id: el.id,
      title: el.name,
    }));
  } else if (searchType === 'organization' || searchType === 'specialist') {
    const isOrganization = searchType === 'organization';
    const include = {
      select: { id: true },
    };
    const syncItems = await prisma.searchEntry.findMany({
      include: isOrganization ? { organization: include } : { specialist: include },
      where: buildFilter(entityFilter, query, searchType),
      orderBy: { sortString: 'asc' },
    });
    mappedSyncItems = syncItems.map(el => ({
      id: isOrganization ? el.organization.id : el.specialist.id,
      title: el.sortString,
    }));
  } else {
    throw new BadRequestException({
      message: 'searchType, should be either request, specialist or organization',
    });
  }
  return NextResponse.json({
    data: mappedSyncItems,
  });
}

export const handler = withErrorHandler(async req => {
  const {
    type,
    // TODO: Uncomment pagination params take and skip when pagination is implemented on the frontend
    // take,
    // skip,
    searchSync,
    searchType,
    query,
    format,
    request,
    district: districts,
  } = getSearchParamsFromRequest(
    req,
    {
      request: undefined,
      format: undefined,
      type: undefined,
      // take: 10,
      // skip: 0,
      searchSync: false,
      searchType: undefined,
      query: undefined,
      district: undefined,
    },
    params => ({
      ...params,
      take: parseInt(params.take, 10),
      skip: parseInt(params.skip, 10),
      district: typeof params.district === 'string' ? [params.district] : params.district,
    }),
  );
  const entityFilter = {
    AND: {
      isActive: true,
      therapies: type && {
        some: {
          type,
        },
      },
      therapiesCuts: request && {
        some: {
          requests: {
            some: {
              id: request,
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
    },
  };

  if (searchSync) {
    return handleSearchSync(entityFilter, query, searchType);
  }
  return handleSearch(entityFilter, query, searchType);
});

export { handler as GET };
