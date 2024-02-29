import React from 'react';
import PropType from 'prop-types';
import { cn } from '@/utils/cn';
import { ListTruncator } from '../../ListTruncator';

export function SpecialistTitle({ id, truncate, name, className }) {
  return truncate ? (
    <ListTruncator
      id={`specialist-title-${id}`}
      content={
        <h4 className={cn('relative whitespace-nowrap text-p3 font-bold text-gray-700 lg:text-p1', className)}>
          {name}
        </h4>
      }
      hintContent={<div>{name}</div>}
      hintEllipsisClassName="top-[29px]"
    />
  ) : (
    <h4 className={cn('text-p3 font-bold text-gray-700 lg:text-p1', className)}>{name}</h4>
  );
}

SpecialistTitle.propTypes = {
  name: PropType.string,
  className: PropType.string,
  truncate: PropType.bool,
  id: PropType.string,
};
