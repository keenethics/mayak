import React from 'react';
import PropType from 'prop-types';
import { cn } from '@utils/cn';

export function CardHeader({ children, className }) {
  return <header className={cn('flex gap-[10px]', className)}>{children}</header>;
}

CardHeader.propTypes = {
  children: PropType.node,
  className: PropType.node,
};
