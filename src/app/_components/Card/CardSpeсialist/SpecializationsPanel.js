'use client';

import React, { useEffect, useRef, useState } from 'react';
import P from 'prop-types';
import { Dot } from '@icons/index';

import { Show as ShowHint, Window as HintWindow } from '../../Hint';
import { Caption } from '../../Typography';

export function SpecializationsPanel({ specialistId, specializations }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [overflown, setOverflown] = useState(false);

  useEffect(() => {
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    if (wrapperWidth >= containerWidth) {
      setOverflown(true);
    } else {
      setOverflown(false);
    }
  }, [wrapperRef, containerRef]);

  return (
    <div id={`specializations-of-${specialistId}`} ref={containerRef} className="relative w-full">
      <span id={`wrapper-of-${specialistId}`} className="inline-flex items-center gap-[8px] pr-[50px]" ref={wrapperRef}>
        {specializations.map((specialization, index) => (
          <>
            <Caption key={index} className="whitespace-nowrap text-start font-bold text-gray-600 lg:text-p4">
              {specialization}
            </Caption>
            {index !== specializations.length - 1 && <Dot />}
          </>
        ))}
      </span>
      {overflown && (
        <>
          <ShowHint opens={`hint-for-${specialistId}`}>
            <span className="absolute right-0 top-0 z-[13] h-full w-[30px] cursor-pointer bg-gradient-to-l from-other-white from-[60%] text-end text-gray-600">
              &nbsp;...&nbsp;
            </span>
          </ShowHint>
          <HintWindow name={`hint-for-${specialistId}`} className="right-0 top-[20px] z-[99999]">
            <div className="flex flex-col gap-[10px] rounded-[4px] px-[8px] py-[4px] shadow-[0_2px_8px_0px_rgba(192,191,206,0.50)]">
              {specializations.map((specialization, index) => (
                <>
                  <div key={index} className="text-center text-c2 text-gray-900">
                    {specialization}
                  </div>
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
  specialistId: P.string.isRequired,
};
