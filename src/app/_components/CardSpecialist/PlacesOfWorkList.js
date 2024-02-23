import React from 'react';
import PropType from 'prop-types';
import { cn } from '@utils/cn';

export function PlacesOfWorkList({ places, className }) {
  return (
    <ul className={cn('border-t border-dashed border-t-gray-200', className)}>
      {places.map(({ id, nameOfClinic, fullAddress, district }) => (
        <li key={id}>
          <h3 className="mt-[12px] text-p4 font-bold text-gray-700">{nameOfClinic || 'Місце надання послуг'}</h3>
          <div className="text-p4">
            <p>{fullAddress}</p>
            <p>{district.name} район</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

PlacesOfWorkList.propTypes = {
  places: PropType.array,
  className: PropType.node,
};
