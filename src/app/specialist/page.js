import React from 'react';
import { prisma } from '@/lib/db';
import { CardSpecialist } from '@/app/_components/Card/CardSpecialist';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const data = await prisma.specialist.findMany({
    include: {
      specializations: true,
      therapies: true,
      placesOfWork: true,
    },
  });

  return (
    <>
      <ul>
        {data?.map(specialist => (
          <CardSpecialist
            key={specialist.id}
            firstName={specialist.firstName}
            lastName={specialist.lastName}
            gender={specialist.gender}
          />
        ))}
      </ul>
    </>
  );
}
