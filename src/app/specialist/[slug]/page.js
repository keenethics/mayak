import React from 'react';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';
import { CardSpecialistExtended } from '@/app/_components/Card/CardSpecialist/CardSpecialistExtended';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  const specialist = await prisma.specialist.findUnique({
    where: {
      id,
    },
    include,
  });

  return <CardSpecialistExtended specialist={specialist} />;
}
