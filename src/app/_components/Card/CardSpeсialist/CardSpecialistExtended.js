import React from 'react';
import PropTypes from 'prop-types';
import { CardSpecialist } from '@/app/_components/Card/CardSpeсialist/CardSpecialist';
import { cn } from '@/utils/cn';
import { specialistPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { CardModalWrapper } from '@/app/_components/Card/CardSpeсialist/CardModalWrapper';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-[40px]">
      <CardSpecialist specialist={specialist} className={cn(className)} extended={true} />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
