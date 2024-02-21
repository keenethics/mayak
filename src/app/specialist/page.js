import React from 'react';
import { prisma } from '@/lib/db';
import { ShortCardMain } from '@/app/_components/Cards/ShortCard/ShortCardMain';
import { CardSpecialistPreview } from '@/app/_components/Cards/ShortCard/CardSpecialistPreview';

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
      <ShortCardMain />
      <ul>
        {data?.map(specialist => (
          <CardSpecialistPreview
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
