import React from 'react';
import PropType from 'prop-types';
import { cn } from '@/utils/cn';

export function SpecialistTitle({ name, className }) {
  return <h4 className={cn('text-p3 font-bold text-gray-700 lg:text-p1', className)}>{name}</h4>;
}

SpecialistTitle.propTypes = {
  name: PropType.string,
  className: PropType.string,
};
