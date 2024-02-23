import React from 'react';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';
import { CardSpecialistExtended } from '@/app/_components/Card/CardSpecialistExtended';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  const data = await prisma.specialist.findUnique({
    where: {
      id,
    },
    include,
  });

  return (
    <div className="m-5">
      <CardSpecialistExtended />
      <pre className="m-6">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
