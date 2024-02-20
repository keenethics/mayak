import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import Moncerrat from '@/app/styles/font';

export function Paragraph({ children, className }) {
  return <p className={cn('text-primary-900', className, Moncerrat.className)}>{children}</p>;
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
