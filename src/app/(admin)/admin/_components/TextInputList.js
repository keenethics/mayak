import React from 'react';
import { required, TextInput } from 'react-admin';
import PropTypes from 'prop-types';

export const TextInputList = ({ list, className }) => (
  <>
    {list.map(({ name, type, label, isRequired, ...inputProps }) => (
      <TextInput
        key={name}
        name={name}
        type={type}
        label={label}
        validate={[isRequired && required()]}
        className={className}
        {...inputProps}
      />
    ))}
  </>
);

TextInputList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};
