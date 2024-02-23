import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function Paragraph({ children, className }) {
  return <p className={cn('text-primary-900', className)}>{children}</p>;
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
