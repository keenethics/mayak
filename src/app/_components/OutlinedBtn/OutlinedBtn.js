import React from 'react';
import p from 'prop-types';
import { cn } from '@utils/cn';

export default function OutlinedBtn({ children, className }) {
  // Basic styles
  const flexCenter = 'inline-flex flex-row items-center justify-center';
  const basicBtnSize = 'w-[185px] h-[40px] py-2.5';
  const basicBtn = 'rounded-full outline-none border cursor-pointer';
  const basicBtnText = 'text-sm font-bold text-center';
  const basicBtnBg = 'bg-transparent';
  const basicBtnDisabled = 'disabled:text-gray-400 disabled:bg-transparent';
  const basicBtnBorder = 'active:border-gray-700 disabled:border-gray-200';
  const transition = 'transition duration-200 ease-in-out';

  return (
    <button
      type="button"
      className={cn(
        flexCenter,
        basicBtn,
        basicBtnSize,
        basicBtnText,
        basicBtnBg,
        basicBtnBorder,
        basicBtnDisabled,
        transition,
        className,
      )}
    >
      {children}
    </button>
  );
}

OutlinedBtn.propTypes = {
  children: p.string,
  className: p.string,
};
