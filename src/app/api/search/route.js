import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';

function getPriceFilter(prices) {
  const pricesFilter = [];
  prices.forEach(price => {
    if (price === 'free') {
      pricesFilter.push({ price: { equals: 0 } });
    }
    if (price === 'below500') {
      pricesFilter.push({ AND: [{ price: { gt: 0 } }, { price: { lt: 500 } }] });
    }
    if (price === 'from500to1000') {
      pricesFilter.push({ AND: [{ price: { gte: 500 } }, { price: { lt: 1000 } }] });
    }
    if (price === 'from1000to1500') {
      pricesFilter.push({ AND: [{ price: { gte: 1000 } }, { price: { lt: 1500 } }] });
    }
    if (price === 'above1500') {
      pricesFilter.push({ price: { gte: 1500 } });
    }
  });
  return pricesFilter;
}

export async function GET(req) {
  const {
    type,
    // TODO: Uncomment pagination params take and skip when pagination is implemented on the frontend
    // take,
    // skip,
    format,
    district: districts,
    specialization: specializations,
    price,
  } = getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      specialization: undefined,
      // take: 10,
      // skip: 0,
      district: undefined,
      price: undefined,
    },
    params => ({
      ...params,
      take: parseInt(params.take, 10),
      skip: parseInt(params.skip, 10),
      district: typeof params.district === 'string' ? [params.district] : params.district,
      specialization: typeof params.specialization === 'string' ? [params.specialization] : params.specialization,
      price: typeof params.price === 'string' ? [params.price] : params.price,
    }),
  );
  const priceFilter = price && getPriceFilter(price);
  const specializationIds = specializations && {
    some: { OR: specializations.map(id => ({ id })) },
  };
  const sharedWhere = {
    supportFocuses: {
      some: {
        therapy: type && {
          type,
        },
        OR: priceFilter,
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
