'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useHintContext } from '@components';
import { cn } from '@/utils/cn';
import { screens } from '@/app/styles/tailwind/ui';

export function CardWrapper({ children, className, id }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);
  const params = useSearchParams();
  const { close } = useHintContext();

  const isExtendedCardOpened = !!params.get('id');
  const cursorStyle = isExtendedCardOpened ? 'cursor-auto' : 'cursor-pointer';

  const handleClick = () => {
    // router.push(`/specialist?id=${id}`, { scroll: false });
    router.push(`/specialist/${id}`, { scroll: false });
    close();
  };

  return (
    <div
      className={cn('transition-all md:flex md:cursor-auto lg:mx-auto', cursorStyle, className)}
      onClick={matches && !isExtendedCardOpened ? handleClick : undefined}
    >
      {children}
    </div>
  );
}

CardWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};
