'use client';

import React from 'react';
import PropType from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { screens } from '@/app/styles/tailwind/ui';

export function CardWrapper({ children, className, id }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);

  const handleClick = () => {
    router.push(`/specialist?id=${id}`);
  };

  return <div className={cn('md:flex lg:mx-auto cursor-pointer md:cursor-auto', className)}
    onClick={matches ? handleClick : undefined}>{children}</div>;
}

CardWrapper.propTypes = {
  children: PropType.node,
  className: PropType.string,
  id: PropType.string,
};
