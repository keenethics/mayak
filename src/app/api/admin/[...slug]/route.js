import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { RESOURCES } from '@admin/_lib/consts';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';

const MODEL_SEARCH_FIELDS = {
  [RESOURCES.event]: ['title', 'organizerName'],
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.organization]: ['name'],
};

const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
    therapies: { select: { id: true, type: true, title: true } },
    specializations: { select: { id: true, name: true } },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
      },
    },
  },
  [RESOURCES.organization]: {
    therapies: { select: { id: true, type: true, title: true } },
    type: { select: { id: true, name: true } },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { id: true, name: true } },
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
    let result;

    if (modelName.toLocaleLowerCase() === 'specialist' || modelName.toLocaleLowerCase() === 'organization') {
      result = await defaultHandler(json, prisma, {
        getList: {
          debug: false,
          where: searchInputFilters(modelName, json.params?.filter?.q),
          include: MODEL_INCLUDES[modelName],
        },
        getOne: {
          debug: false,
          include: MODEL_INCLUDES[modelName],
          transform: instance => {
            // ReferenceInput doesn't see included fields if it returned as new object, so we need to transform current
            // eslint-disable-next-line no-param-reassign
            instance.specializationsIds = instance.specializations.map(specialization => specialization.id);
            // eslint-disable-next-line no-param-reassign
            instance.therapiesIds = instance.therapies.map(therapy => therapy.id);
            // eslint-disable-next-line no-param-reassign
            instance.addressesIds = instance.addresses.map(address => address.id);
            // eslint-disable-next-line no-param-reassign
            instance.addresses = instance?.addresses?.map(address => ({
              ...address,
              districtId: address.district.id,
            }));
          },
        },
        update: {
          allowJsonUpdate: {
            addresses: true,
            districts: true,
            specializations: true,
            therapies: true,
          },
        },
      });
    } else {
      result = await defaultHandler(json, prisma, {
        getList: {
          debug: false,
          where: searchInputFilters(modelName, json.params?.filter?.q),
          include: MODEL_INCLUDES[modelName],
        },
        getOne: {
          debug: false,
          include: MODEL_INCLUDES[modelName],
        },
        update: {
          debug: false,
          allowJsonUpdate: {
            tags: true,
            additionalLink: true,
          },
          include: MODEL_INCLUDES[modelName],
        },
      });
    }
    // console.log({ result: JSON.stringify(result) });
    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
