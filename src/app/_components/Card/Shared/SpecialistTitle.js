import React from 'react';
import PropType from 'prop-types';
import { cn } from '@utils/cn';

export function SpecialistTitle({ title, className }) {
  return <h4 className={cn('text-p3 font-bold text-gray-700 lg:text-p1', className)}>{title}</h4>;
}

SpecialistTitle.propTypes = {
  title: PropType.string,
  className: PropType.string,
};
