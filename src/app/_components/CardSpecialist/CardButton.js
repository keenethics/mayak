import React from 'react';
import PropTypes from 'prop-types';
import { PillButton } from '@components';
import { cn } from '@utils/cn';

export function CardButton({ text = 'Детальніше', className, ...props }) {
  return (
    <PillButton variant="outlined" colorVariant="orange" className={cn('lg:text-p4', className)} {...props}>
      {text}
    </PillButton>
  );
}

CardButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
