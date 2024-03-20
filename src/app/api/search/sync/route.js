import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchFilterQueryParams, createSearchEntryFilter, createEntityFilter } from '../common';

export const handler = withErrorHandler(async req => {
  const queryParams = getSearchFilterQueryParams(req);
  const { searchType, query } = queryParams;

  const entityFilter = createEntityFilter(queryParams);
  const searchEntryFilter = createSearchEntryFilter(entityFilter, query, searchType);

  const searchTypeFindAndMap = {
    request: {
      find: () =>
        prisma.request.findMany({
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        }),
      map: el => ({
        id: el.id,
        title: el.name,
      }),
    },
    organization: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchEntryFilter,
          orderBy: { sortString: 'asc' },
        }),
      map: el => ({
        id: el.organizationId,
        title: el.sortString,
      }),
    },
    specialist: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchEntryFilter,
          orderBy: { sortString: 'asc' },
        }),
      map: el => ({
        id: el.specialistId,
        title: el.sortString,
      }),
    },
  };

  if (!(searchType in searchTypeFindAndMap)) {
    throw new BadRequestException({
      message: 'searchType, should be either request, specialist or organization',
    });
  }

  const syncItems = await searchTypeFindAndMap[searchType].find();
  const mappedSyncItems = syncItems.map(searchTypeFindAndMap[searchType].map);

  return NextResponse.json({
    data: mappedSyncItems,
  });
});

export { handler as GET };
