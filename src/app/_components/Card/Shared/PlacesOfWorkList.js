import React from 'react';
import PropType from 'prop-types';

export function PlacesOfWorkList({ className }) {
  return (
    <ul className={className}>
      <li>
        <h3 className="mt-[12px] text-p2 font-bold text-gray-700">Назва клініки</h3>
        <p>Місто/село</p>
        <p>Вулиця, номер будинку, поверх, кабінет</p>
      </li>
    </ul>
  );
}

PlacesOfWorkList.propTypes = {
  className: PropType.node,
};
