import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';

const handler = withErrorHandler(
  auth(async req => {
    if (!req.auth) {
      throw new NotAuthorizedException();
    }
    const json = await req.json();
    console.log(json.params.data);
    // console.log(json.params.data.addresses);
    // console.log(json.params.data.type);
    // console.log(json.params.data.therapies);
    const result = await defaultHandler(json, prisma);
    return NextResponse.json(result);
  }),
);

export { handler as GET, handler as POST };
