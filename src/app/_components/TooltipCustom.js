import React from 'react';
import PropTypes from 'prop-types';

export function TooltipCustom({ children, textToDisplay, show = false }) {
  const hasTooltip = show ? 'has-tooltip' : '';
  return (
    <div className={hasTooltip}>
      <span className="tooltip -mt-7 rounded bg-primary-700 p-1 text-c3 font-bold text-other-white shadow-lg">
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
};
