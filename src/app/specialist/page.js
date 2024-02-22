import React from 'react';
import { SpecialistList } from '@components';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const data = await prisma.specialist.findMany({
    include,
  });

  return <SpecialistList specialists={data} />;
}
