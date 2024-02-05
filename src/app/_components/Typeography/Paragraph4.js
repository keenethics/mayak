import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraph4({ children, styles }) {
  return (
    <p
      className={`font-montserrat text-[0.875rem] leading-[1.25rem] ${styles}`}
    >
      {children}
    </p>
  );
}
Paragraph4.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
};
