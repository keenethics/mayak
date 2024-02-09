import React from 'react';
import { BooleanInput } from 'react-admin';
import PropTypes from 'prop-types';

const IsActive = ({ onChange, label, className }) => (
  <BooleanInput
    name="isActive"
    source="isActive"
    label={label}
    onChange={onChange}
    className={className}
  />
);

IsActive.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
};

export { IsActive };
