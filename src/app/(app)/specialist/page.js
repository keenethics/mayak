import React from 'react';
import { PillButton, SpecialistList } from '@components';
import { formatPhoneNumber } from '@utils/common';
import { prisma } from '@/lib/db';
import { organizationInclude, specialistInclude } from '@/app/(app)/specialist/consts';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const specialistsList = await prisma.specialist.findMany({
    where: {
      isActive: true,
    },
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

  const organizationList = await prisma.organization.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
    include: organizationInclude,
  });

  const mappedOrganizationList = organizationList.map(organization => {
    if (organization.phone) {
      return {
        ...organization,
        phone: formatPhoneNumber(organization.phone),
      };
    }

    return organization;
  });

  return (
    <div className="mx-auto mb-16 max-w-[900px]">
      <SpecialistList specialists={mappedSpecialistList} className="mt-[22px]" />
      <SpecialistList specialists={mappedOrganizationList} className="mt-[22px]" />
      <div className="flex w-full justify-center">
        <PillButton variant="tonal" colorVariant="lightblue" aria-label="Load more items">
          Завантажити ще
        </PillButton>
      </div>
    </div>
  );
}
