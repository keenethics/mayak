import React from 'react';
import PropTypes from 'prop-types';
import { CardSpecialist } from '@/app/_components/CardSpecialist';

export function SpecialistList({ specialists, className }) {
  return (
    <ul className={className}>
      {specialists.map(specialist => (
        <CardSpecialist className="m-[16px]" key={specialist.id} specialist={specialist} />
      ))}
    </ul>
  );
}

SpecialistList.propTypes = {
  specialists: PropTypes.array,
  className: PropTypes.string,
};
