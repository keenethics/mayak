import React from 'react';
import PropTypes from 'prop-types';
import cn from '@/app/utils/cn';

export default function Paragraph({ children, className }) {
  return (
    <p className={cn('font-montserrat text-primary-900', className)}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
