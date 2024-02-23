import React from 'react';
import PropTypes from 'prop-types';
import { CardSpecialist } from './Card/CardSpeсialist';

export function SpecialistList({ specialists, className }) {
  return (
    <ul className={className}>
      {specialists.map(specialist => (
        <CardSpecialist
          className="mx-[16px] my-[24px] md:my-[40px] lg:mx-auto"
          key={specialist.id}
          specialist={specialist}
        />
      ))}
    </ul>
  );
}

SpecialistList.propTypes = {
  specialists: PropTypes.array,
  className: PropTypes.string,
};
