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
    specialization: specializations,
  } = getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      specialization: undefined,
      // take: 10,
      // skip: 0,
      district: undefined,
    },
    params => ({
      ...params,
      take: parseInt(params.take, 10),
      skip: parseInt(params.skip, 10),
      district: typeof params.district === 'string' ? [params.district] : params.district,
      specialization: typeof params.specialization === 'string' ? [params.specialization] : params.specialization,
    }),
  );

  const specializationIds = specializations && {
    some: { OR: specializations.map(id => ({ id })) },
  };

  const sharedWhere = {
    supportFocuses: type && {
      some: {
        therapy: {
          type,
        },
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
  };

  const specialistWhere = {
    AND: {
      ...sharedWhere,
      specializations: specializationIds,
    },
  };

  const organizationWhere = {
    AND: {
      ...sharedWhere,
      expertSpecializations: specializationIds,
    },
  };

  const sharedInclude = {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        therapy: true,
        requests: true,
      },
    },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
      },
    },
  };

  const totalCount = await prisma.searchEntry.count({
    where: {
      OR: [
        {
          organization: organizationWhere,
        },
        {
          specialist: specialistWhere,
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
          expertSpecializations: { select: { name: true } },
        },
      },
    },
    where: {
      OR: [
        {
          organization: organizationWhere,
        },
        {
          specialist: specialistWhere,
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
