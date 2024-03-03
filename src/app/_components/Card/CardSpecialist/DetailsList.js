import React from 'react';
import PropType from 'prop-types';
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
  details: PropType.shape({
    addresses: PropType.arrayOf(
      PropType.shape({
        id: PropType.string.isRequired,
        nameOfClinic: PropType.string.isRequired,
        fullAddress: PropType.string.isRequired,
        district: PropType.string.isRequired,
      }),
    ),
    description: PropType.string,
  }),
  className: PropType.node,
};
