import React from 'react';
import PropTypes from 'prop-types';
import { IDCard } from '@icons/index';
import { AddressesList } from '@/app/_components/Card/CardSpecialist/AddressesList';
import { cn } from '@/utils/cn';

export function DetailsList({ details, className }) {
  const { addresses, description } = details;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <AddressesList addresses={addresses} showIcon={true} />
      <ul>
        <li className="flex gap-3 md:gap-4">
          <span className="text-gray-500 lg:mt-[3px]">
            <IDCard />
          </span>
          <div className="text-p4 lg:text-p3">
            <h3 className="font-bold text-gray-700">Про спеціаліста</h3>
            <p>{description}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

DetailsList.propTypes = {
  details: PropTypes.shape({
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nameOfClinic: PropTypes.string.isRequired,
        fullAddress: PropTypes.string.isRequired,
        district: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      }),
    ),
    description: PropTypes.string,
  }),
  className: PropTypes.node,
};
