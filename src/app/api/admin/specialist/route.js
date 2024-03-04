import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { searchInputFilters, withErrorHandlerAndAuth, MODEL_INCLUDES } from '../common';
import { RESOURCES } from '@/app/admin/_lib/consts';

const handler = withErrorHandlerAndAuth(async req => {
  const json = await req.json();
  const { method } = json;
  if (method === 'create') {
    const result = await prisma.$transaction(async trx => {
      const specialist = await trx.specialist.create({
        data: json.params.data,
      });
      await trx.searchEntry.create({
        data: {
          sortString: `${specialist.firstName} ${specialist.lastName} ${specialist.surnameName || ''}`,
          specialist: {
            connect: {
              id: specialist.id,
            },
          },
        },
      });
      return specialist;
    });
    return NextResponse.json({ data: result });
  }
  const result = await defaultHandler(json, prisma, {
    getList: {
      debug: false,
      where: searchInputFilters(RESOURCES.specialist, json.params?.filter?.q),
    },
    getOne: { debug: false, include: MODEL_INCLUDES[RESOURCES.specialist] },
  });
  return NextResponse.json(result);
});

export { handler as GET, handler as POST };
