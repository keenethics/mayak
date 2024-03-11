import React from 'react';
import PropTypes from 'prop-types';
import { CardModalWrapper, CardSpecialist } from '@components';
import { specialistPropType } from '@/app/_components/CardSpecialist/prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-[40px] lg:mt-0 w-full lg:w-[1080px] max-w-[1080px]" key={specialist.id}>
      <CardSpecialist specialist={specialist} className={className} extended />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};