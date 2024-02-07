import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const GET = withErrorHandler(async () => {
  const specialists = await prisma.specialist.findMany();
  return NextResponse.json(specialists);
});

export const POST = withErrorHandler(async (request) => {
  const data = await request.json();
  const specialist = await prisma.specialist.create({ data });
  return NextResponse.json(specialist);
});
