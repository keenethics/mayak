import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { RESOURCES } from '@/app/admin/_lib/consts';

const MODEL_SEARCH_FIELDS = {
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.event]: ['title', 'organizerName'],
};

const MODEL_INCLUDES = {
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
    types: { select: { name: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { name: true } },
      },
    },
  },
  [RESOURCES.event]: {
    additionalLink: { select: { label: true, link: true } },
    tags: { select: { name: true } },
  },
};

function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = MODEL_SEARCH_FIELDS[modelName].map(field => ({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}

const handler = auth(
  withErrorHandler(async req => {
    if (!req.auth) throw new NotAuthorizedException();
    const json = await req.json();
    const { resource: modelName } = json;
    const result = await defaultHandler(json, prisma, {
      getList: {
        where: searchInputFilters(modelName, json.params?.filter?.q),
      },
      getOne: { include: MODEL_INCLUDES[modelName] },
    });
    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
