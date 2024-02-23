import React from 'react';
import PropType from 'prop-types';
import { cn } from '@/utils/cn';

export function PlacesOfWorkList({ places, className }) {
  return (
    <ul className={cn(className)}>
      {places.map(({ id, nameOfClinic, fullAddress, district }) => (
        <li key={id}>
          <h3 className="mt-[12px] text-p4 font-bold text-gray-700 lg:text-p3">
            {nameOfClinic || 'Місце надання послуг'}
          </h3>
          <p className="text-p4 text-gray-700 lg:text-p3">{fullAddress}</p>
          <p className="text-p4 text-gray-700 lg:text-p3">{district.name} район</p>
        </li>
      ))}
    </ul>
  );
}

PlacesOfWorkList.propTypes = {
  places: PropType.array,
  className: PropType.node,
};
