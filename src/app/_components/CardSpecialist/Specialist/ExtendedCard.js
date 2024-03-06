import React from 'react';
import PropTypes from 'prop-types';
import { CardModalWrapper } from '../CardModalWrapper';
import { specialistPropType } from '../prop-types';
import { CardSpecialist } from './Card';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-[40px] lg:mt-0" key={specialist.id}>
      <CardSpecialist specialist={specialist} className={className} extended />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};