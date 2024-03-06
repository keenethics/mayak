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
        district: { select: { name: true } },
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
    let result;

    // console.log({ modelName });
    if (modelName.toLocaleLowerCase() === 'specialist' || modelName.toLocaleLowerCase() === 'organization') {
      result = await defaultHandler(json, prisma, {
        getList: {
          debug: false,
          where: searchInputFilters(modelName, json.params?.filter?.q),
        },
        getOne: {
          debug: false,
          include: MODEL_INCLUDES[modelName],
          transform: instance => {
            // console.log({ instance: JSON.stringify(instance) });
            const instanceWithIds = { ...instance };
            instanceWithIds.specializationsIds = instance.specializations.map(specialization => specialization.id);
            instanceWithIds.therapiesIds = instance.therapies.map(therapy => therapy.id);
            instanceWithIds.addressesIds = instance.addresses.map(address => address.id);
            instanceWithIds.addresses = instance.addresses.map(address => ({
              ...address,
              districtId: address.district.id,
            }));
            return instanceWithIds;
          },
        },
        update: {
          include: MODEL_INCLUDES[modelName],
          set: {
            specializationsIds: {
              specializations: 'id',
            },
            therapiesIds: {
              therapies: 'id',
            },
          },
        },
      });
    } else {
      result = await defaultHandler(json, prisma, {
        getList: {
          debug: false,
          where: searchInputFilters(modelName, json.params?.filter?.q),
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
        },
      });
    }
    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
