import { prisma } from '@/lib/db';

export async function GET(req) {
  const today = new Date();
  const currentYear = today.getFullYear();

  try {
    const url = new URL(req.url);
    const take = url.searchParams.get('take');
    const lastCursor = url.searchParams.get('lastCursor');
    const queryMonth = url.searchParams.get('month');

    const filteredQueryMonth = parseInt(queryMonth < 10 ? `0${queryMonth}` : queryMonth, 10);
    const startOfMonth = new Date(currentYear, filteredQueryMonth - 1, 1);
    const endOfMonth = new Date(currentYear, filteredQueryMonth, 0);
    // const startNextMonth = new Date(currentYear, filteredQueryMonth + 1, 1);
    const endOfNextMonth = new Date(currentYear, filteredQueryMonth, 0);

    // console.log('end cur mon', endOfMonth, 'startNextMonth', startNextMonth, 'endOfNextMonth', endOfNextMonth);

    const result = await prisma.event.findMany({
      include: { tags: true, additionalLink: true },
      where: {
        isActive: true,
        eventDate: {
          gte: filteredQueryMonth === today.getMonth() + 1 ? today : startOfMonth,
          lte: filteredQueryMonth === today.getMonth() + 1 ? endOfMonth : endOfNextMonth,
        },
      },
      take: take ? parseInt(take, 10) : 3,

      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor,
        },
      }),
      orderBy: {
        eventDate: 'asc',
      },
    });

    if (result.length === 0) {
      return new Response(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        { status: 200 },
      );
    }

    const lastPostInResults = result[result.length - 1];
    const cursor = lastPostInResults.id;

    const nextPage = await prisma.event.findMany({
      take: take ? parseInt(take, 10) : 3,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        eventDate: 'asc',
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
        queryMonth,
      },
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 403 });
  }
}
