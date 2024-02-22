import React from 'react';
import PropType from 'prop-types';

export function PlacesOfWorkList({ places, className }) {
  return (
    <ul className={className}>
      {places.map(({ id, nameOfClinic, fullAddress, district }) => (
        <li key={id}>
          <h3 className="mt-[12px] text-p2 font-bold text-gray-700">{nameOfClinic || 'Місце надання послуг'}</h3>
          <p>{fullAddress}</p>
          <p>{district.name} район</p>
        </li>
      ))}
    </ul>
  );
}

PlacesOfWorkList.propTypes = {
  places: PropType.array,
  className: PropType.node,
};
