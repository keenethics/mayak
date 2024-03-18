import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { MODEL_INCLUDES, searchInputFilters, transformServiceProvider } from '../common';

const handler = auth(
  withErrorHandler(async req => {
    if (!req.auth) throw new NotAuthorizedException();

    const json = await req.json();

    const modelName = json.resource.charAt(0).toLowerCase() + json.resource.slice(1);
    const isServiceProvider = modelName === 'specialist' || modelName === 'organization';

    const getOneTransform = instance => {
      transformServiceProvider(instance, modelName);
    };

    // console.log({ modelName, data: JSON.stringify(json.params.data) });
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
          requests: true,
          type: true,
        },
        include: MODEL_INCLUDES[modelName],
      },
    });

    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
