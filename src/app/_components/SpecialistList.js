'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from './CardSpecialist';
import { specialistPropType } from './CardSpecialist/prop-types';

export function SpecialistList({ specialists, className }) {
  const cardStyle =
    'md:shadow-custom-1 mx-4 my-6 max-w-[906px] rounded-3xl border-2 border-gray-200 px-4 py-5 md:my-10 md:p-10 lg:mx-auto';

  return (
    <>
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
