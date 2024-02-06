import { prisma } from '@/lib/db';

export async function DELETE(_, { params }) {
  const { slug: id } = params;
  const therapy = await prisma.therapy.delete({ where: { id } });
  return Response.json(therapy);
}
