import React from 'react';
import PropType from 'prop-types';
import { cn } from '@/utils/cn';

export function CardWrapper({ children, className }) {
  return <div className={cn('md:flex lg:mx-auto', className)}>{children}</div>;
}

CardWrapper.propTypes = {
  children: PropType.node,
  className: PropType.string,
};
