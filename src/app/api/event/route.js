import { prisma } from '@/lib/db';

export async function GET() {
  const events = await prisma.event.findMany({ include: { tags: true } });
  return Response.json(events);
}
