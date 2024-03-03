import React from 'react';
import PropTypes from 'prop-types';
import { CardSpecialist } from '@/app/_components/Card/CardSpecialist/CardSpecialist';
import { specialistPropType } from '@/app/_components/Card/CardSpecialist/prop-types';
import { CardModalWrapper } from '@/app/_components/Card/CardSpecialist/CardModalWrapper';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-[40px]">
      <CardSpecialist specialist={specialist} className={className} extended />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
