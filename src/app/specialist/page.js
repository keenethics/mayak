import React from 'react';
import { SpecialistList } from '@components';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const specialistsList = await prisma.specialist.findMany({
    include,
  });
  return <SpecialistList specialists={specialistsList} className="mt-[22px]" />;
}
