import React from 'react';
import PropType from 'prop-types';
import { HospitalSVG } from '@icons/index';
import { cn } from '@/utils/cn';
import { borderStyle } from '@/app/_components/Card/CardSpecialist/config';

export function AddressesList({ addresses, className, showIcon = false }) {
  return (
    <ul className={cn('flex flex-col gap-4', borderStyle, className)}>
      {addresses.map(({ id, nameOfClinic, fullAddress, district }) => (
        <li key={id} className="flex gap-4">
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

AddressesList.defaultProps = {
  showIcon: false,
};

AddressesList.propTypes = {
  addresses: PropType.array,
  showIcon: PropType.bool,
  className: PropType.node,
};
