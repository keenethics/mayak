import React from 'react';
import { SpecialistsList } from '@/app/_components/Specialists';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  return (
    <div className="m-5">
      <SpecialistsList />
    </div>
  );
}
