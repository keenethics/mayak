import React from 'react';
import PropTypes from 'prop-types';
import { PillButton } from '@components';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export function CardButton({ text = 'Детальніше', className, id }) {
  const router = useRouter();

  // const handleClick = () => router.push(`/specialist?id=${id}`, { scroll: false });
  const handleClick = () => router.push(`/specialist/${id}`, { scroll: false });

  return (
    <PillButton
      variant="outlined"
      colorVariant="orange"
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block lg:text-p4', className)}
      onClick={handleClick}
    >
      {text}
    </PillButton>
  );
}

CardButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
