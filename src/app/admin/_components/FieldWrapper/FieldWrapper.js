import React from 'react';
import PropTypes from 'prop-types';

export default function FieldWrapper({ title, children }) {
  return (
    <div className="mt-4 w-full">
      <h4 className="text-h4 font-bold text-primary-700">{title}</h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}

FieldWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
