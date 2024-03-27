import { Filters } from '@components/Specialists';
import { SpecialistList } from '@components/Specialists/SpecialistList';
import React from 'react';

export const metadata = {
  title: '',
  description: '',
};

export default function Page() {
  return (
    <div className="mx-auto mb-16 max-w-[900px] px-4 lg:px-0">
      <Filters />
      <SpecialistList className="mt-5 md:mt-[22px]" />
    </div>
  );
}
