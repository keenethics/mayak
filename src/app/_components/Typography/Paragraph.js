import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraph({ children, styles }) {
  return (
    <p className={`font-montserrat text-primary-900 ${styles}`}>{children}</p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
};
