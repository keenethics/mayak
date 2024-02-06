'use client';

import React from 'react';
import PropTypes from 'prop-types';

export default function CheckBox({
  value,
  onChange,
  name,
  text = '',
  subText = '',
  disabled = false,
  checked = false,
  children = null,
  extraClasses = {
    text: '',
    subText: '',
    disabledText: '',
    disabledSubText: '',
    tick: '',
    label: '',
    checkBox: '',
  },
}) {
  const id = `checkbox_id_${name}_|_${value}__`;
  /* eslint-disable max-len */
  const styles = {
    checkBox: {
      base: 'peer h-[20px] w-[20px] rounded-[4px] border-gray-500 bg-other-white p-[2px]',
      disabled:
        'disabled:border-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:border-gray-300',
      hover: 'hover:border-primary-500 hover:bg-primary-100',
      focus:
        'focus:border-primary-400 focus:bg-other-white focus:hover:border-primary-500 focus:ring-[4px] focus:ring-primary-300 focus:ring-offset-0',
      checked:
        'checked:bg-primary-100 checked:border-primary-400 checked:focus:bg-primary-100 checked:focus:border-primary-400 checked:hover:bg-primary-100 checked:hover:border-primary-500',
    },
    label: {
      beforeLayout:
        'before:absolute before:left-[4px] before:top-[4px] before:block before:h-[18px]  before:w-[18px]',
      beforeBase:
        'before:border-spacing-[1px] before:rounded-[4px] before:bg-other-white',
      beforeChecked: `peer-checked:before:border-primary-400 peer-checked:before::bg-primary-100
        peer-checked:before:hover:border-primary-500 peer-checked:before:hover:border-primary-500`,
      other: `peer-focus:before:bg-other-white peer-disabled:before:bg-gray-200 
        peer-disabled:before:hover:border-gray-300`,
    },
  };
  /* eslint-enable */
  return (
    <div className="relative flex gap-[12px] p-[3px]">
      <input
        id={id}
        name={name}
        className={`
          ${styles.checkBox.base}
          ${styles.checkBox.disabled}
          ${styles.checkBox.hover}
          ${styles.checkBox.focus}
          ${styles.checkBox.checked}
          ${extraClasses.checkBox}
        `}
        value={value}
        onChange={onChange}
        type="checkbox"
        checked={checked}
        disabled={disabled}
      />
      <label
        className={`
          ${styles.label.base}
          ${styles.label.beforeLayout}
          ${styles.label.beforeBase}
          ${styles.label.beforeChecked}
          ${extraClasses.label}
        `}
        htmlFor={id}
      >
        {checked && (
          <Tick
            styles={`absolute left-[7px] top-[9px] stroke-primary-500 ${extraClasses.tick} 
            ${disabled && 'stroke-gray-300'} ${disabled && extraClasses.disabledTick}`}
          />
        )}
        {text && (
          <div className="mt-[-2px] flex flex-col content-between">
            {text ? (
              <>
                {text && (
                  <p
                    className={`text-p3 ${extraClasses.text}
                    ${disabled && 'text-gray-400'} ${disabled && extraClasses.disabledText}`}
                  >
                    {text}
                  </p>
                )}
                {subText && (
                  <p
                    className={`text-p4 ${extraClasses.subText} 
                    ${disabled && 'text-gray-400'} ${disabled && extraClasses.disabledSubText}`}
                  >
                    {subText}
                  </p>
                )}
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

function Tick({ styles }) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
    >
      <path
        d="M10.6663 1.5L4.24967 7.91667L1.33301 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Tick.propTypes = {
  styles: PropTypes.string,
};
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
  extraClasses: PropTypes.shape({
    text: PropTypes.string,
    subText: PropTypes.string,
    disabledText: PropTypes.string,
    disabledSubText: PropTypes.string,
    tick: PropTypes.string,
    disabledTick: PropTypes.string,
    label: PropTypes.string,
    checkBox: PropTypes.string,
  }),
};
