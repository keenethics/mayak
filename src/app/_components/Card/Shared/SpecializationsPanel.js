import React from 'react';
import P from 'prop-types';
import { Dot } from '@icons/index';
import { Caption } from '../../Typography';
import { Show as ShowHint, Window as HintWindow } from '@/app/_components/Hint';

export function SpecializationsPanel({ specializations }) {
  return (
    <div className=" line-clamp-1 flex-row items-start gap-[8px] *:flex">
      {specializations.map((specialization, index) => (
        <>
          <Caption key={index} className="flex-row text-start font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </>
      ))}
      {/* Need to check number of symbols here. 60 max on full card on desktop */}
      {specializations.length > 1 && (
        <>
          <ShowHint opens="organization-types-hint">
            <div>...</div>
          </ShowHint>
          <HintWindow name="organization-types-hint" id="organization-types-hint">
            <div className="flex flex-col items-center gap-[8px] lg:text-p4">
              {specializations.map((specialization, index) => (
                <>
                  <Caption key={index} className="px-[4px] py-[8px] text-center text-c2   text-gray-900  ">
                    {specialization}
                  </Caption>
                </>
              ))}
            </div>
          </HintWindow>
        </>
      )}
    </div>
  );
}

SpecializationsPanel.propTypes = {
  specializations: P.arrayOf(P.string).isRequired,
};
