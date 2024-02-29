import React from 'react';
import PropType from 'prop-types';
import { HospitalSVG } from '@icons/index';
import { cn } from '@/utils/cn';
import { borderStyle } from '@/app/_components/Card/CardSpeсialist/config';

export function PlacesOfWorkList({ places, className, showIcon = false }) {
  return (
    <ul className={cn(borderStyle, className)}>
      {places.map(({ id, nameOfClinic, fullAddress, district }) => (
        <li key={id} className="flex gap-[12px] md:gap-[16px]">
          {showIcon && (
            <span className="text-gray-500">
              <HospitalSVG />
            </span>
          )}
          <div className="text-p4 lg:text-p3">
            <h3 className="font-bold text-gray-700">{nameOfClinic || 'Місце надання послуг'}</h3>
            <div>
              <p>{fullAddress}</p>
              <p>{district.name} район</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

PlacesOfWorkList.propTypes = {
  places: PropType.array,
  showIcon: PropType.bool,
  className: PropType.node,
};
