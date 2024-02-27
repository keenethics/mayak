import React from 'react';
import { SpecialistList } from '@components';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';
import { parsePhoneNumber } from '@/utils/common';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const specialistsList = await prisma.specialist.findMany({
    orderBy: [
      {
        lastName: 'asc',
      },
    ],
    include,
  });

  const mappedSpecialistList = specialistsList.map(specialist => {
    if (specialist.phone) {
      return {
        ...specialist,
        phone: parsePhoneNumber(specialist.phone),
      };
    }

    return specialist;
  });

  return <SpecialistList specialists={mappedSpecialistList} className="mt-[22px]" />;
}
