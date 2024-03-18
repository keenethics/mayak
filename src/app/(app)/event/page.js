import { Heading, Caption } from '@/app/_components/Typography';
import { EventFilter } from '@/app/_components/Event/EventFilter';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Події',
  description: 'Перелік доступних подій',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center self-stretch px-[16px] py-[24px] md:px-[40px] md:py-[30px] lg:px-[80px] lg:pb-[80px] lg:pt-[64px]">
      <div className="mx-auto flex w-full flex-col items-start justify-start gap-[24px] self-stretch lg:w-[900px]">
        <Heading type="h3" className="text-h3 font-bold text-primary-800">
          Події
        </Heading>
        <Caption type="c2" className="font-bold uppercase text-primary-600">
          найближчі місяці
        </Caption>
        <EventFilter />
      </div>
    </div>
  );
}
