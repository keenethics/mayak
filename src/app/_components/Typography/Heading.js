import React from 'react';
import PropTypes from 'prop-types';

export default function Heading({ children, type, styles }) {
  return React.createElement(
    type,
    {
      className: `font-montserrat text-primary-900 ${styles}`,
    },
    children,
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']).isRequired,
  styles: PropTypes.string,
};
