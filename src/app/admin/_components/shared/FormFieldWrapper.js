import React from 'react';
import PropTypes from 'prop-types';

const FormFieldWrapper = ({ title, children }) => (
  <div className="mt-2 w-full">
    <h3 className="text-p2 font-bold text-primary-700">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);

FormFieldWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export { FormFieldWrapper };
