import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { searchInputFilters, withErrorHandlerAndAuth, MODEL_INCLUDES } from '../common';

const handler = withErrorHandlerAndAuth(async req => {
  const json = await req.json();
  const { resource: modelName } = json;
  const result = await defaultHandler(json, prisma, {
    getList: {
      debug: false,
      where: searchInputFilters(modelName, json.params?.filter?.q),
    },
    getOne: { debug: false, include: MODEL_INCLUDES[modelName] },
  });
  return NextResponse.json(result);
});

export { handler as GET, handler as POST };
