import React from 'react';
import p from 'prop-types';

export default function OutlinedBtn({ children, className }) {
  // Basic styles
  const flexCenter = 'inline-flex flex-row items-center justify-center';
  const transition = 'transition duration-200 ease-in-out';
  const basicBtn = 'w-[185px] h-[40px] py-2.5 px-6 rounded-full bg-transparent outline-none border cursor-pointer text-p4 font-bold text-center';
  const btnHoverFocus = 'hover:bg-primary-200 focus:text-primary-600  focus:bg-primary-200 focus:border-primary-600 active:bg-primary-200 active:text-primary-600 active:border-gray-700 disabled:text-gray-400 disabled:bg-transparent disabled:border-gray-200';

  return (
    <button
      type="button"
      className={`${className} ${flexCenter} ${basicBtn} ${btnHoverFocus} ${transition}`}
    >
      {' '}
      {children}{' '}
    </button>
  );
}

OutlinedBtn.propTypes = {
  children: p.string,
  className: p.string,
};
