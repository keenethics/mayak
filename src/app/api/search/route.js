import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';

export async function GET(req) {
  const {
    type,
    // TODO: Uncomment pagination params take and skip when pagination is implemented on the frontend
    // take,
    // skip,
    format,
    district: districts,
  } = getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      // take: 10,
      // skip: 0,
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
      therapies: type && {
        some: {
          type,
        },
      },
      isActive: true,
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
  const sharedInclude = {
    therapies: { select: { title: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
  };

  const totalCount = await prisma.searchEntry.count({
    where: {
      OR: [
        {
          organization: whereFilter,
        },
        {
          specialist: whereFilter,
        },
      ],
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
      OR: [
        {
          organization: whereFilter,
        },
        {
          specialist: whereFilter,
        },
      ],
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
    data,
  });
}
