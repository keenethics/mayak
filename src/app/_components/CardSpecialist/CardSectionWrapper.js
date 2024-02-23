import React from 'react';
import P from 'prop-types';

export function CardSectionWrapper({ children, className }) {
  return <div className={className}>{children}</div>;
}

CardSectionWrapper.propTypes = {
  children: P.node,
  className: P.string,
};
