import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { MODEL_INCLUDES } from '@/lib/consts';
import { searchInputFilters } from '@/lib/searchInputFilters';

const handler = auth(
  withErrorHandler(async (req) => {
    if (!req.auth) throw new NotAuthorizedException();
    const json = await req.json();
    const { resource: modelName } = json;
    const result = await defaultHandler(json, prisma, {
      getList: {
        debug: false,
        where: searchInputFilters(modelName, json.params?.filter?.q),
      },
      getOne: { debug: false, include: MODEL_INCLUDES[modelName] },
      audit: {
        model: prisma.audit,
      },
    });
    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
