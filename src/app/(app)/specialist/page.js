import React from 'react';
import { SpecialistList, Filters } from '@components';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default function Page() {
  return (
    <div className="mx-auto mb-16 max-w-[900px]">
      <Filters />
      <SpecialistList className="mt-[22px]" />
    </div>
  );
}
