import React from 'react';
import PropTypes from 'prop-types';

export function TickIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
    >
      <path
        d="M10.6663 1.5L4.24967 7.91667L1.33301 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

TickIcon.propTypes = {
  className: PropTypes.string,
};
