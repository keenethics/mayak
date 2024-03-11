import { prisma } from '@/lib/db';
import { Caption, Heading } from '@/app/_components';
import { NoEvents } from '@/app/_components/NoEvents';
import { EventFilter } from '@/app/_components/EventFilter/EventFilter';

export const metadata = {
  title: 'Події',
  description: 'Опис сторінки подій',
};

export default async function Page() {
  const events = await prisma.event.findMany();

  return (
    <div className="flex flex-col items-center justify-center self-stretch sm:px-[16px] sm:py-[24px] md:px-[40px] md:py-[30px] lg:px-[80px] lg:pb-[80px] lg:pt-[64px]">
      <div className="mx-auto flex w-full flex-col items-start justify-start gap-[24px] self-stretch  lg:w-[900px]">
        <Heading type="h3" className="text-h3 text-primary-800">
          Події
        </Heading>
        <Caption type="c2" className=" uppercase text-primary-600">
          найближчі місяці
        </Caption>
        <EventFilter events={events} />
        {/* <ul className="flex flex-row flex-wrap items-start justify-start gap-[12px]">
         
        </ul> */}
        {events.length === 0 ? (
          <NoEvents />
        ) : (
          <ul
            className="grid w-full
           self-stretch sm:grid-cols-1 md:grid-cols-2 md:gap-[12px] lg:grid-cols-3 lg:gap-[16px]"
          >
            {/* {some data from event component} */}
          </ul>
        )}
      </div>
    </div>
  );
}
