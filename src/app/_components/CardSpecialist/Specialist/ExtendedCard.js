import React from 'react';
import PropTypes from 'prop-types';
import { CardModalWrapper } from '../CardModalWrapper';
import { CardSpecialist } from './Card';
import { specialistPropType } from '../prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-[40px]" key={specialist.id}>
      <CardSpecialist specialist={specialist} className={className} extended />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
