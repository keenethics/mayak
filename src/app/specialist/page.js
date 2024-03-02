import React from 'react';
import { SpecialistList } from '@components';
import { prisma } from '@/lib/db';
import { specialistInclude } from '@/app/specialist/consts';
import { formatPhoneNumber } from '@/utils/common';

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
    include: specialistInclude,
  });

  const mappedSpecialistList = specialistsList.map(specialist => {
    if (specialist.phone) {
      return {
        ...specialist,
        phone: formatPhoneNumber(specialist.phone),
      };
    }

    return specialist;
  });

  return <SpecialistList specialists={mappedSpecialistList} className="mt-[22px]" />;
}
