import React from 'react';
import { PillButton, SpecialistList } from '@components';
import { formatPhoneNumber } from '@utils/common';
import { organizationInclude, specialistInclude } from '@/app/(app)/specialist/consts';
import { getSpecialists, sortSpecialistsByName } from '@/app/(app)/specialist/utils';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default async function Page() {
  const specialistsList = getSpecialists({
    model: 'specialist',
    orderByCondition: { lastName: 'asc' },
    include: specialistInclude,
  });

  const organizationList = getSpecialists({
    model: 'organization',
    orderByCondition: { name: 'asc' },
    include: organizationInclude,
  });

  const allSpecialists = await Promise.all([specialistsList, organizationList])
    .then(([specialists, organizations]) => {
      const concatenatedList = specialists.concat(organizations);

      return concatenatedList.map(specialist => {
        if (specialist.phone) {
          return {
            ...specialist,
            phone: formatPhoneNumber(specialist.phone),
          };
        }

        return specialist;
      });
    })
    .then(list => sortSpecialistsByName(list));

  return (
    <div className="mx-auto mb-16 max-w-[900px]">
      <SpecialistList specialists={allSpecialists} className="mt-[22px]" />
      <div className="flex w-full justify-center">
        <PillButton variant="tonal" colorVariant="lightblue" aria-label="Load more items">
          Завантажити ще
        </PillButton>
      </div>
    </div>
  );
}
