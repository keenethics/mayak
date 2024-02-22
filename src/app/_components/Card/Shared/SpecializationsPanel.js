import React from 'react';
import P from 'prop-types';
import { Caption } from '../../Typography';
import { Show as ShowHint, Window as HintWindow } from '@/app/_components/Hint';

export function SpecializationsPanel({ specializations }) {
  return (
    <div className="flex items-center gap-[8px]">
      {specializations.map((specialization, index) => (
        <>
          <Caption key={index} className="text-center text-c2 font-bold text-gray-600">
            {specialization}
          </Caption>
          {/* {index !== specializations.length - 1 && <DotIcon />} */}
        </>
      ))}
      {/* Need to check number of symbols here */}
      {specializations.length > 1 && (
        <>
          <ShowHint opens="organization-types-hint">
            <div>...</div>
          </ShowHint>
          <HintWindow name="organization-types-hint" id="organization-types-hint">
            <div className="flex flex-col items-center gap-[8px]">some text</div>
          </HintWindow>
        </>
      )}
    </div>
  );
}

SpecializationsPanel.propTypes = {
  specializations: P.arrayOf(P.string).isRequired,
};
