import React from 'react';
import PropType from 'prop-types';
import { PillButton } from '@components';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export function CardButton({ text = 'Детальніше', className, id }) {
  const router = useRouter();

  return (
    <PillButton
      variant="outlined"
      colorVariant="orange"
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block lg:text-p4', className)}
      onClick={() => router.push(`/specialist?id=${id}`, { scroll: false })}
    >
      {text}
    </PillButton>
  );
}

CardButton.defaultProps = {
  text: 'Детальніше',
};

CardButton.propTypes = {
  id: PropType.string,
  text: PropType.string,
  className: PropType.string,
};
