import React from 'react';
import { Filters } from '@components/Specialists/Filters';
import { SpecialistList } from '@components/Specialists/SpecialistList';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default function Page() {
  return (
    <div className="mx-auto mb-4 max-w-max px-4 lg:mb-8">
      <Filters />
      <SpecialistList className="my-5 md:my-8" />
    </div>
  );
}
