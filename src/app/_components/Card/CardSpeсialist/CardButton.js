'use client';

import React from 'react';
import PropType from 'prop-types';
import { PillButton } from '@components';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { buttonColorVariant, buttonType } from '@/app/_components/PillButton/style';

export function CardButton({ text = 'Детальніше', className, id }) {
  const router = useRouter();
  return (
    <PillButton
      type={buttonType.outlined}
      colorVariant={buttonColorVariant.outlined.orange}
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block', className)}
      onClick={() => router.push(`specialist/${id}`)}
    >
      {text}
    </PillButton>
  );
}

CardButton.propTypes = {
  id: PropType.string,
  text: PropType.string,
  className: PropType.string,
};
