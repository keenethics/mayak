import React from 'react';
import PropTypes from 'prop-types';
import { InputErrorIcon } from '../Icons/InputErrorIcon';
import { cn } from '@/utils/cn';
import { variants } from './styles';

export function TextInputField({
  value,
  name,
  onChange,
  type = 'text',
  disabled = false,
  placeholder = '',
  error = '',
  required = false,
  variant = variants.default,
}) {
  const id = `textinput_${name}`;
  return (
    <div className={cn(variant.mainContainer.base)}>
      {error && <p className={cn(variant.errorParagraph.base)}>{error}</p>}
      <div
        className={cn(
          variant.inputContainer.base,
          variant.inputContainer.style,
          variant.inputContainer.focusWithin,
          error && variant.inputContainer.error,
        )}
      >
        <input
          className={cn(variant.input.base, variant.input.focus, variant.input.style, error && variant.input.error)}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={`${placeholder}${required ? '*' : ''}`}
          required={required}
        />
        {error && <InputErrorIcon className={cn(variant.errorIcon.base)} />}
      </div>

      <label className={cn(variant.label.base, variant.label.stateful, error && variant.label.error)} htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
}

TextInputField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'url', 'password', 'search', 'tel']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.shape({
    mainContainer: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
    label: PropTypes.shape({
      base: PropTypes.string.isRequired,
      stateful: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    inputContainer: PropTypes.shape({
      base: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      focusWithin: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    input: PropTypes.shape({
      base: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    errorIcon: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
    errorParagraph: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
  }),
};