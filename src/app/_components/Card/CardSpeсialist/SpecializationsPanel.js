'use client';

import React, { useEffect, useRef, useState } from 'react';
import P from 'prop-types';
import { Dot } from '@icons/index';

import { Show as ShowHint, Window as HintWindow } from '../../Hint';
import { Caption } from '../../Typography';

function ListTruncator({ id, items, ellipsis = '...', itemRender, tooltipItemRender }) {
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
    <div id={`specializations-of-${id}`} ref={containerRef} className="relative w-full">
      <span id={`wrapper-of-${id}`} className="inline-flex items-center gap-[8px] pr-[50px]" ref={wrapperRef}>
        {items.map(itemRender)}
      </span>
      {overflown && (
        <>
          <ShowHint
            opens={`hint-for-${id}`}
            actions={{ onMouseEnter: ({ open }) => open(`hint-for-${id}`), onMouseLeave: ({ close }) => close() }}
          >
            <span className="invisible absolute right-[80px] top-0 h-full w-[80px] cursor-pointer select-none bg-gradient-to-l from-other-white from-[30%] text-end font-bold text-gray-600 md:visible md:right-0">
              &nbsp;{ellipsis}&nbsp;
            </span>
          </ShowHint>
          <ShowHint
            opens={`hint-for-${id}`}
            actions={{
              onClick: ({ open }) => {
                open(n => (n === `hint-for-${id}` ? '' : `hint-for-${id}`));
              },
            }}
          >
            <span className="absolute right-[80px] top-0 h-full w-[80px] cursor-pointer select-none bg-gradient-to-l from-other-white from-[30%] text-end font-bold text-gray-600 md:invisible md:right-0">
              &nbsp;{ellipsis}&nbsp;
            </span>
          </ShowHint>
          <HintWindow name={`hint-for-${id}`} className="right-0 top-[20px]">
            <div className="visible flex flex-col gap-[10px] rounded-[4px] px-[8px] py-[4px] shadow-[0_2px_8px_0px_rgba(192,191,206,0.50)]">
              {items.map(tooltipItemRender)}
            </div>
          </HintWindow>
        </>
      )}
    </div>
  );
}

ListTruncator.propTypes = {
  id: P.string.isRequired,
  items: P.arrayOf(P.string).isRequired,
  itemRender: P.func.isRequired,
  tooltipItemRender: P.func.isRequired,
  ellipsis: P.string,
};

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
