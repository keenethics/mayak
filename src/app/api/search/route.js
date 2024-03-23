import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, createEntityFilter, getSearchFilterQueryParams } from './helpers';

export const handler = withErrorHandler(async req => {
  const queryParams = getSearchFilterQueryParams(req);
  const {
    // TODO: Uncomment pagination params take and skip when pagination is implemented on the frontend
    // take,
    // skip,
    searchType,
    query,
  } = queryParams;

  const entityFilter = createEntityFilter(queryParams);
  const searchEntryFilter = createSearchEntryFilter(entityFilter, query, searchType);

  const totalCount = await prisma.searchEntry.count({ where: searchEntryFilter });
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
    where: searchEntryFilter,
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
});

export { handler as GET };
