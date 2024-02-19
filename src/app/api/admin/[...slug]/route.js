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

    try {
      const json = await req.json();
      const result = await defaultHandler(json, prisma);
      return NextResponse.json(result);
    } catch (err) {
      const {message} = err;
      return NextResponse.json({ error: { message } }, { status: 500 });
    }
  }),
);

export { handler as GET, handler as POST };
