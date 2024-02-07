import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

const handler = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  try {
    const json = await req.json();
    const result = await defaultHandler(json, prisma);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
});

export { handler as GET, handler as POST };
