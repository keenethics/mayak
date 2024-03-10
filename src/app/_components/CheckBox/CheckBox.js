'use client';

import React from 'react';
import PropTypes from 'prop-types';
import TickIcon from '@icons/tickIcon.svg';
import { cn } from '@utils/cn';
import { variants } from './styles';

export function CheckBox({
  value,
  onChange,
  name,
  text = '',
  subText = '',
  disabled = false,
  checked = false,
  children = null,
  variant = variants.default,
}) {
  const id = `checkbox_${name}_${value}`;
  return (
    <div className={cn(variant.container.base)}>
      <input
        id={id}
        name={name}
        className={cn(
          variant.checkBox.base,
          variant.checkBox.hover,
          variant.checkBox.focus,
          variant.checkBox.focusRing,
          variant.checkBox.checked,
          variant.checkBox.checkedFocus,
          variant.checkBox.checkedHover,
          variant.checkBox.disabled,
        )}
        value={value}
        onChange={onChange}
        type="checkbox"
        checked={checked}
        disabled={disabled}
      />
      <label
        className={cn(
          variant.labelBefore.base,
          variant.labelBefore.layout,
          variant.labelBefore.peerFocus,
          variant.labelBefore.peerChecked,
          variant.labelBefore.peerDisabled,
        )}
        htmlFor={id}
      >
        {checked && (
          <TickIcon className={cn(variant.tick.position, variant.tick.base, disabled && variant.tick.disabled)} />
        )}
        {text && (
          <div className={cn(variant.textContainer.base, variant.textContainer.position)}>
            {text ? (
              <>
                {text && <p className={cn(variant.text.base, disabled && variant.text.disabled)}>{text}</p>}
                {subText && <p className={cn(variant.subText.base, disabled && variant.subText.disabled)}>{subText}</p>}
              </>
            ) : (
              { children }
            )}
          </div>
        )}
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  subText: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  isMultiChoice: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.shape({
    container: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
    checkBox: PropTypes.shape({
      base: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      hover: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      focusRing: PropTypes.string.isRequired,
      checked: PropTypes.string.isRequired,
      checkedFocus: PropTypes.string.isRequired,
      checkedHover: PropTypes.string.isRequired,
    }),
    labelBefore: PropTypes.shape({
      layout: PropTypes.string.isRequired,
      base: PropTypes.string.isRequired,
      peerChecked: PropTypes.string.isRequired,
      peerFocus: PropTypes.string.isRequired,
      peerDisabled: PropTypes.string.isRequired,
    }),
    textContainer: PropTypes.shape({
      base: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
    text: PropTypes.shape({
      base: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
    }),
    subText: PropTypes.shape({
      base: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
    }),
    tick: PropTypes.shape({
      position: PropTypes.string.isRequired,
      base: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
    }),
  }),
};
