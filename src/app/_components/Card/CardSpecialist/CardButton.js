import React from 'react';
import PropTypes from 'prop-types';
import { PillButton } from '@components';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export function CardButton({ text = 'Детальніше', className, id }) {
  return (
    <Link
      href={`/specialist/${id}`}
      scroll={false}
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block lg:text-p4', className)}
    >
      <PillButton variant="outlined" colorVariant="orange">
        {text}
      </PillButton>
    </Link>
  );
}

CardButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
