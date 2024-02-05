import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraph3({ children, styles }) {
  return (
    <p
      className={`font-montserrat text-center text-[1rem] leading-[1.5rem] ${styles}`}
    >
      {children}
    </p>
  );
}
Paragraph3.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
};
