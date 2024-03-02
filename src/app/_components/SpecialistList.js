'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { CardSpecialist } from './Card/CardSpecialist';
import { CardSpecialistExtended } from '@/app/_components/Card/CardSpecialist/CardSpecialistExtended';
import { specialistPropType } from './Card/CardSpecialist/prop-types';

export function SpecialistList({ specialists, className }) {
  const searchParams = useSearchParams();
  const selectedSpecialistId = searchParams.get('id');

  const getSpecialist = id => specialists.find(specialist => specialist.id === id);

  return (
    <>
      {selectedSpecialistId && <CardSpecialistExtended specialist={getSpecialist(selectedSpecialistId)} />}
      <ul className={className}>
        {specialists.map(specialist => (
          <li id={specialist.id} key={specialist.id}>
            <CardSpecialist
              className="mx-[16px] my-[24px] max-w-[906px] rounded-[24px] border-2 border-gray-200 px-[15px] py-[20px] md:my-[40px] md:p-[40px] md:shadow-[4px_2px_4px_0px_rgba(192,191,206,0.25),0px_0px_16px_0px_rgba(192,191,206,0.50)] lg:mx-auto"
              specialist={specialist}
            />
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
