import { prisma } from '@/lib/db';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';

export async function GET(req) {
  const { name } = getSearchParamsFromRequest(req);
  const therapies = await prisma.request.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  return Response.json(therapies);
}
