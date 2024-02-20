import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import Moncerrat from '@/app/styles/font';

export function Heading({ children, type, className }) {
  return React.createElement(
    type,
    {
      className: cn('font-montserrat text-primary-900', className, Moncerrat.className),
    },
    children,
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']).isRequired,
  className: PropTypes.string,
};
