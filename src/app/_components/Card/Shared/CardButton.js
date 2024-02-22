import React from 'react';
import PropType from 'prop-types';
import { PillButton } from '@components';
import { cn } from '@utils/cn';
import { buttonColorVariant, buttonType } from '@/app/_components/PillButton/style';

export function CardButton({ text = 'Детальніше', className }) {
  return (
    <PillButton
      type={buttonType.outlined}
      colorVariant={buttonColorVariant.outlined.orange}
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block', className)}
    >
      {text}
    </PillButton>
  );
}

CardButton.propTypes = {
  text: PropType.string,
  className: PropType.string,
};
