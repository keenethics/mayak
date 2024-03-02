'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Show as ShowHint, Window as HintWindow } from './Hint';
import { getRandomInt } from '@/utils/common';
import { cn } from '@/utils/cn';

export function ListTruncator({ id, content, hintContent, ellipsis, hintEllipsisClassName, hintWindowClassName }) {
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
      <span ref={wrapperRef} className="relative inline-flex items-center gap-[8px]">
        {content}
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
            <span
              className={cn(
                'right-0 top-[-3px] flex w-[80px] cursor-pointer justify-end bg-gradient-to-l from-other-white from-[30%] text-gray-600',
                hintEllipsisClassName,
                'absolute select-none',
              )}
            >
              {ellipsis || `...`}
            </span>
          </ShowHint>
          <HintWindow
            name={hintId}
            id={hintId}
            className={cn(
              'right-[10px] top-[30px] z-[200] flex select-text flex-col gap-[10px] text-gray-900',
              hintWindowClassName,
            )}
          >
            {hintContent}
          </HintWindow>
        </>
      )}
    </div>
  );
}

ListTruncator.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  hintContent: PropTypes.node.isRequired,
  ellipsis: PropTypes.node,
  hintWindowClassName: PropTypes.string,
  hintEllipsisClassName: PropTypes.string,
};
