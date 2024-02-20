import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import Moncerrat from '@/app/styles/font';

export function Caption({ children, className }) {
  return (
    <span className={cn('uppercase tracking-[0.009rem] text-primary-900', className, Moncerrat.className)}>
      {children}
    </span>
  );
}

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
