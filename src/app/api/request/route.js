import { prisma } from '@/lib/db';

export async function GET({ nextUrl: { searchParams } }) {
  const name = searchParams.get('name') ?? '';
  const requests = await prisma.therapy.findMany({ where: { name: { contains: name } } });
  return Response.json(requests);
}
