import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { RESOURCES } from '@/app/(admin)/admin/_lib/consts';

const MODEL_SEARCH_FIELDS = {
  [RESOURCES.event]: ['title', 'organizerName'],
  [RESOURCES.specialist]: ['firstName', 'lastName', 'surname'],
  [RESOURCES.organization]: ['name'],
};

const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
    therapiesCuts: { select: { id: true, therapy: { select: { id: true, title: true, type: true } }, requests: true } },
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
    therapiesCuts: { select: { id: true, therapy: { select: { id: true, title: true, type: true } }, requests: true } },
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
  [RESOURCES.therapy]: {
    requests: { select: { id: true, name: true } },
    _count: {
      select: { requests: true },
    },
  },
};

function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = MODEL_SEARCH_FIELDS[modelName].map(field => ({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}

/* eslint-disable no-param-reassign */
function transformServiceProvider(instance, modelName) {
  // ReferenceInput doesn't see included fields if it returned as new object, so we need to transform current
  // React Admin issues
  if (modelName === RESOURCES.organization) {
    instance.organizationTypesIds = instance.type.map(orgType => orgType.id);
  } else {
    instance.specializationsIds = instance.specializations.map(specialization => specialization.id);
  }
  instance.therapiesCutsIds = instance.therapiesCuts.map(cut => cut.id);
  instance.therapiesCuts = instance?.therapiesCuts?.map(cut => ({
    ...cut,
    therapyId: cut.therapy.id,
    requestsIds: cut.requests.map(request => request.id),
  }));
  instance.addresses = instance?.addresses?.map(address => ({
    ...address,
    districtId: address.district.id,
  }));
}
/* eslint-enable no-param-reassign */

const handler = auth(
  withErrorHandler(async req => {
    if (!req.auth) throw new NotAuthorizedException();

    const json = await req.json();

    const modelName = json.resource.charAt(0).toLowerCase() + json.resource.slice(1);
    const isServiceProvider = modelName === 'specialist' || modelName === 'organization';

    const getOneTransform = instance => {
      transformServiceProvider(instance, modelName);
    };

    const result = await defaultHandler(json, prisma, {
      getList: {
        debug: false,
        where: searchInputFilters(modelName, json.params?.filter?.q),
        include: MODEL_INCLUDES[modelName],
      },
      getOne: {
        debug: false,
        include: MODEL_INCLUDES[modelName],
        transform: isServiceProvider ? getOneTransform : undefined,
      },
      update: {
        debug: false,
        allowJsonUpdate: {
          tags: true,
          additionalLink: true,
          addresses: true,
          districts: true,
          specializations: true,
          therapies: true,
          therapiesCuts: true,
          type: true,
        },
        include: MODEL_INCLUDES[modelName],
      },
    });

    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
