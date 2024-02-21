import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import Montserrat from '@/app/styles/font';

export function Paragraph({ children, className }) {
  return <p className={cn('text-primary-900', className, Montserrat.className)}>{children}</p>;
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
