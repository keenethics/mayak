import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function Caption({ children, className }) {
  return (
    <span className={cn('text-inherit uppercase tracking-[0.009rem] text-primary-900', className)}>{children}</span>
  );
}

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
