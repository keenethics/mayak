import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';

async function handleSearch(whereFilter) {
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

  const totalCount = await prisma.searchEntry.count({
    where: {
      OR: [{ organization: whereFilter }, { specialist: whereFilter }],
    },
  });

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
    where: {
      OR: [{ organization: whereFilter }, { specialist: whereFilter }],
    },
    orderBy: {
      sortString: 'asc',
    },
    // take,
    // skip,
  });

  const data = searchEntries.map(entry => (entry.specialist ? entry.specialist : entry.organization));

  return NextResponse.json({
    totalCount,
    totalQueried: searchEntries.length,
    data,
  });
}

async function handleSearchSync(searchType, query, whereFilter) {
  let mappedSyncItems = [];
  if (searchType === 'request') {
    // TODO: when the requests are implemented
  } else if (searchType === 'organization' || searchType === 'specialist') {
    const isOrganization = searchType === 'organization';
    const syncItems = await prisma.searchEntry.findMany({
      include: isOrganization ? { organization: { select: { id: true } } } : { specialist: { select: { id: true } } },
      where: {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        ...(isOrganization ? { organization: whereFilter } : { specialist: whereFilter }),
      },
      orderBy: {
        sortString: 'asc',
      },
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
    district: districts,
  } = getSearchParamsFromRequest(
    req,
    {
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
  const whereFilter = {
    AND: {
      isActive: true,
      therapies: type && {
        some: {
          type,
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
    return handleSearchSync(searchType, query, whereFilter);
  }
  return handleSearch(whereFilter);
});

export { handler as GET };
