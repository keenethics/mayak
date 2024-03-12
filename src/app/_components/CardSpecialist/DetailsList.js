import React from 'react';
import PropTypes from 'prop-types';
import { IDCard } from '@icons/index';
import { cn } from '@utils/cn';
import { AddressesList } from '@/app/_components/CardSpecialist/AddressesList';
import { TherapyPrices } from './TherapyPrices';

export function DetailsList({ details, className }) {
  const { addresses, description, therapyPrices } = details;
  const hasAddresses = addresses.length > 0;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {hasAddresses && <AddressesList addresses={addresses} showIcon />}
      <TherapyPrices therapyPrices={therapyPrices} className="hidden lg:flex" />
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
      <TherapyPrices therapyPrices={therapyPrices} className="lg:hidden" />
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
    therapyPrices: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        therapy: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  }),
  className: PropTypes.node,
};
