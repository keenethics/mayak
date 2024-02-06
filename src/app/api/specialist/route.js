import { prisma } from '@/lib/db';

export async function GET() {
  const specialists = await prisma.specialist.findMany();
  return Response.json(specialists);
}
