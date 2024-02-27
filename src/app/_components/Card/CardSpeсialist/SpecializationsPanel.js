'use client';

import P from 'prop-types';
import { Dot } from '@icons/index';
import { ListTruncator } from '../../ListTruncator';
import { Caption } from '../../Typography';

export function SpecializationsPanel({ specialistId, specializations }) {
  return (
    <ListTruncator
      id={specialistId}
      items={specializations}
      itemRender={(specialization, index) => (
        <>
          <Caption key={index} className="whitespace-nowrap text-start font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </>
      )}
      tooltipItemRender={(specialization, index) => (
        <div key={index} className="text-center text-c2 text-gray-900">
          {specialization}
        </div>
      )}
    />
  );
}

SpecializationsPanel.propTypes = {
  specializations: P.arrayOf(P.string).isRequired,
  specialistId: P.string.isRequired,
};
