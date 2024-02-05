import React from 'react';
import PropTypes from 'prop-types';
import { stylesCore } from '@/app/styles/constants/coreStyles';

export default function OutlineButton({ onClick }) {
  const buttonStyle = `${stylesCore.flex.fullCenteredFlex} w-[1rem] h-[1rem] / 
  flex-shrink-0 text-[transparent] hover:text-[#FFF]`;
  return (
    <button className={`${buttonStyle}`} onClick={onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" rx="8" fill="currentColor" />
        <path
          d="M4.66666 4.66675L11.3333 11.3334M4.66666 11.3334L11.3333 4.66675"
          stroke="#504F53"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
OutlineButton.propTypes = {
  onClick: PropTypes.func,
};
