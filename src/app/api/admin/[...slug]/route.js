import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { searchInputFilters, withErrorHandlerAndAuth, MODEL_INCLUDES } from '../common';

const handler = withErrorHandlerAndAuth(async req => {
  const json = await req.json();
  const { resource: modelName } = json;
  const result = await defaultHandler(json, prisma, {
    getList: {
      where: searchInputFilters(modelName, json.params?.filter?.q),
    },
    getOne: { include: MODEL_INCLUDES[modelName] },
    update: {
      debug: false,
      allowJsonUpdate: {
        tags: true,
        additionalLink: true,
      },
    },
  });
  return NextResponse.json(result);
});

export { handler as GET, handler as POST };
