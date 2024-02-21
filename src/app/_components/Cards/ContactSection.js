import React from 'react';
import P from 'prop-types';

function ContactSection({ children }) {
  return <div className="flex w-[200px] items-center gap-[8px]">{children}</div>;
}
export  {ContactSection};
ContactSection.propTypes = {
  children: P.node,
};
