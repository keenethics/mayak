'use client';

import P from 'prop-types';
import { Dot } from '@icons/index';
import { useSearchParams } from 'next/navigation';
import { Caption, ListTruncator } from '@components';

export function SpecializationsPanel({ specialistId, specializations }) {
  const params = useSearchParams();
  const extendedCardOpened = !!params.get('id');

  return extendedCardOpened ? (
    <div className="inline-flex flex-wrap items-center gap-[8px]">
      {specializations.map((specialization, index) => (
        <div className="flex items-center justify-center gap-[10px]" key={`${specialization}-${index}`}>
          <Caption className="whitespace-nowrap text-start font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </div>
      ))}
    </div>
  ) : (
    <ListTruncator
      id={specialistId}
      content={specializations.map((specialization, index) => (
        <div key={`${specialization}-${index}`} className="flex items-center justify-center gap-[10px]">
          <Caption className="whitespace-nowrap text-start text-cardsm font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </div>
      ))}
      hintContent={specializations.map((specialization, index) => (
        <div key={`hint-${specialization}-${index}`} className="text-center text-c2 text-gray-900">
          {specialization}
        </div>
      ))}
    />
  );
}

SpecializationsPanel.propTypes = {
  specializations: P.arrayOf(P.string).isRequired,
  specialistId: P.string.isRequired,
};
