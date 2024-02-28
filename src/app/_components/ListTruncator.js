'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import P from 'prop-types';
import { Show as ShowHint, Window as HintWindow } from './Hint';
import { getRandomInt } from '@/utils/common';
import { cn } from '@/utils/cn';

export function ListTruncator({ id, items, ellipsis, itemRender, tooltipItemRender, hintWindowClassName }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [overflown, setOverflown] = useState(false);

  const calculateOverflow = useCallback(() => {
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    if (wrapperWidth > containerWidth) {
      setOverflown(true);
    } else {
      setOverflown(false);
    }
  }, [wrapperRef, containerRef]);

  useEffect(() => {
    calculateOverflow();
    window.addEventListener('resize', calculateOverflow);

    return () => {
      window.removeEventListener('resize', calculateOverflow);
    };
  }, [calculateOverflow]);

  const hintId = `hint-for-${id}-${getRandomInt(0, 1000000)}`;

  return (
    <div ref={containerRef} className="max-w-full overflow-hidden">
      <span className="relative inline-flex items-center gap-[8px]" ref={wrapperRef}>
        {items.map(itemRender)}
      </span>
      {overflown && (
        <>
          <ShowHint
            opens={hintId}
            actions={{
              onMouseEnter: ({ open }) => open(hintId),
              onMouseLeave: ({ close }) => close(),
              onClick: ({ open }) => {
                open(n => (n === hintId ? '' : hintId));
              },
            }}
          >
            <span className="absolute right-[-2px] top-[-3px] flex w-[80px] cursor-pointer select-none bg-gradient-to-l from-other-white from-[30%]">
              {ellipsis || <div className="flex w-full justify-end text-gray-600">&nbsp;...&nbsp;</div>}
            </span>
          </ShowHint>
          <HintWindow name={hintId} id={hintId} className={cn('right-[10px] top-[30px] z-[200]', hintWindowClassName)}>
            <div className="flex select-text flex-col gap-[10px] text-gray-900">{items.map(tooltipItemRender)}</div>
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
  ellipsis: P.node,
  hintWindowClassName: P.string,
};
