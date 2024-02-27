import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function TooltipCustom({ children, textToDisplay, show = false, className }) {
  const hasTooltip = show ? 'has-tooltip' : '';
  return (
    <div className={hasTooltip}>
      <span
        className={cn(
          'tooltip -mt-7 rounded bg-primary-700 p-1 text-c3 font-bold text-other-white shadow-lg',
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
