import React from 'react';
import P from 'prop-types';

export function SpecializationList({ children }) {
  return <ul className="mt-[16px] flex gap-[10px] md:flex-initial md:gap-[24px]">{children}</ul>;
}

SpecializationList.propTypes = {
  children: P.node,
};
