import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import Montserrat from '@/app/styles/font';

export function Caption({ children, className }) {
  return (
    <span className={cn('uppercase tracking-[0.009rem] text-primary-900', className, Montserrat.className)}>
      {children}
    </span>
  );
}

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
