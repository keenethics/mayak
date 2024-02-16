import React from 'react';
import { TextInput } from 'react-admin';
import PropTypes from 'prop-types';

export const TextInputList = ({ textInputList, className }) => (
  <>
    {textInputList.map(({ name, type, label, ...inputProps }) => (
      <TextInput
        key={name}
        name={name}
        type={type}
        label={label}
        // validate={isRequired && required()}
        className={className}
        {...inputProps}
      />
    ))}
  </>
);

TextInputList.propTypes = {
  textInputList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};
