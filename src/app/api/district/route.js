import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const districts = await prisma.district.findMany();
  return NextResponse.json(districts);
}
