'use client';

import React from 'react';
import PropType from 'prop-types';
import { PillButton } from '@components';
import { cn } from '@utils/cn';
import Link from 'next/link';
import { buttonColorVariant, buttonType } from '@/app/_components/PillButton/style';

export function CardButton({ text = 'Детальніше', className, id }) {
  return (
    <Link
      href={`specialist/${id}`}
      className={cn('hidden h-[min] self-end justify-self-end md:inline-block', className)}
    >
      <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.orange}>
        {text}
      </PillButton>
    </Link>
  );
}

CardButton.propTypes = {
  id: PropType.string,
  text: PropType.string,
  className: PropType.string,
};
