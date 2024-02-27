'use client';

import React from 'react';
import PropType from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/utils/cn';
import { screens } from '@/app/styles/tailwind/ui';

export function CardWrapper({ children, className, id }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);
  const params = useSearchParams();

  const isExtendedCardOpened = !!params.get('id');
  const cursorStyle = isExtendedCardOpened ? 'cursor-auto' : 'cursor-pointer';

  const handleClick = () => {
    router.push(`/specialist?id=${id}`, { scroll: false });
  };

  return (
    <div
      className={cn('md:flex md:cursor-auto lg:mx-auto', [cursorStyle, className])}
      onClick={matches && !isExtendedCardOpened ? handleClick : undefined}
    >
      {children}
    </div>
  );
}

CardWrapper.propTypes = {
  children: PropType.node,
  className: PropType.string,
  id: PropType.string,
};
