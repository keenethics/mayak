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
      <ul>
        <li className="flex gap-[12px] md:gap-[16px]">
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
  details: PropType.object,
  className: PropType.node,
};
