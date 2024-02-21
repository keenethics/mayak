import React from 'react';
import Link from 'next/link';
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
      <CardSpecialistPreview />
      <ShortCardMain />
      <ul className="m-5">
        {data?.map(({ id }) => (
          <li key={id}>
            <Link href={`specialist/${id}`} className="text-primary-700 hover:text-primary-400">
              {id}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
