import React from 'react';
import PropType from 'prop-types';
import { IDCard } from '@icons/index';
import { PlacesOfWorkList } from '@/app/_components/Card/CardSpeсialist/PlacesOfWorkList';
import { cn } from '@/utils/cn';

export function DetailsList({ details, className }) {
  const { placeOfWork, description } = details;

  return (
    <div className={cn('flex flex-col gap-[16px]', className)}>
      <PlacesOfWorkList places={placeOfWork} showIcon={true} />
      <li className="flex gap-[8px]">
        <span className="text-gray-500">
          <IDCard />
        </span>
        <div>
          <h3 className="text-p4 font-bold text-gray-700">Про спеціаліста</h3>
          <p className="text-p4">{description}</p>
        </div>
      </li>
    </div>
  );
}

DetailsList.propTypes = {
  details: PropType.object,
  className: PropType.node,
};
