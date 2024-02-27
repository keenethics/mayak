import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function TooltipCustom({ children, textToDisplay, show = false, className }) {
  const hasTooltip = show ? 'has-tooltip' : '';
  return (
    <div className={hasTooltip}>
      <span
        className={cn(
          'tooltip z-50 -mt-9 rounded-[4px] bg-other-white px-[4px] py-[8px] text-c3 text-gray-900 shadow-[0px_2px_8px_0px_rgba(192,191,206,0.5)]',
          className,
        )}
      >
        {textToDisplay}
      </span>
      {children}
    </div>
  );
}

TooltipCustom.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  textToDisplay: PropTypes.string,
  className: PropTypes.string,
};
