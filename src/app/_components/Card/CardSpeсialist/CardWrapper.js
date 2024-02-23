import React from 'react';
import PropType from 'prop-types';
import { cn } from '@/utils/cn';

export function CardWrapper({ children, className }) {
  return (
    <div className={cn('max-w-[906px] px-[15px] py-[20px] md:flex md:p-[40px] lg:mx-auto', className)}>{children}</div>
  );
}

CardWrapper.propTypes = {
  children: PropType.node,
  className: PropType.string,
};
