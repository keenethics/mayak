import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';

function ContactText({ children }) {
  return (
    <span className={cn(`text-inherit font-inherit text-center text-[12px] leading-[1.125rem] text-gray-700`)}>
      {children}
    </span>
  );
}

export { ContactText };

ContactText.propTypes = {
  children: P.node,
};
