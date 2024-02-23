import React from 'react';
import PropType from 'prop-types';
import { cn } from '@utils/cn';

export function CardHeader({ children, className }) {
  return <header className={cn('line-clamp-1 flex flex-row gap-[10px]', className)}>{children}</header>;
}

CardHeader.propTypes = {
  children: PropType.node,
  className: PropType.node,
};
