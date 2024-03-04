'use client';

import React from 'react';
import PropTypes from 'prop-types';
// import { useSearchParams } from 'next/navigation';
import { CardSpecialist } from './Card/CardSpecialist';
// import { CardSpecialistExtended } from '@/app/_components/Card/CardSpecialist/CardSpecialistExtended';
import { specialistPropType } from './Card/CardSpecialist/prop-types';
import { CardOrganization } from './Card/CardSpecialist/CardOrganization';

export function SpecialistList({ specialists, className }) {
  // const searchParams = useSearchParams();
  // const selectedSpecialistId = searchParams.get('id');

  // const getSpecialist = id => specialists.find(specialist => specialist.id === id);
  const cardStyle =
    'mx-4 my-6 max-w-[906px] rounded-3xl border-2 border-gray-200 px-[15px] py-5 md:my-10 md:p-10 md:shadow-[4px_2px_4px_0px_rgba(192,191,206,0.25),0px_0px_16px_0px_rgba(192,191,206,0.50)] lg:mx-auto';

  return (
    <>
      {/* {selectedSpecialistId && <CardSpecialistExtended specialist={getSpecialist(selectedSpecialistId)} />} */}
      <ul className={className}>
        {specialists.map(specialist => (
          <li id={specialist.id} key={specialist.id}>
            {specialist.gender ? (
              <CardSpecialist className={cardStyle} specialist={specialist} />
            ) : (
              <CardOrganization className={cardStyle} organization={specialist} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

SpecialistList.propTypes = {
  specialists: PropTypes.arrayOf(specialistPropType),
  className: PropTypes.string,
};
