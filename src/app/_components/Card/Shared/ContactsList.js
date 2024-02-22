import React from 'react';
import P from 'prop-types';
import { cn } from '@utils/cn';

export function ContactsList({ children, className }) {
  return <ul className={cn('mt-[16px] flex flex-col gap-[8px]', className)}>{children}</ul>;
}

ContactsList.propTypes = {
  children: P.node,
  className: P.string,
};
