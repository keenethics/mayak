'use client';

import PropTypes from 'prop-types';

export function TextArea({ value, onChange, maxLength, placeholder, error }) {
  const valueLength = String(value).length;
  return (
    <div className="relative flex h-full flex-col gap-0.5">
      <textarea
        className="appereance-none grow resize-none rounded-xl border-none text-gray-900"
        value={value}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="absolute top-[64px] ml-4 mt-[4px] text-p4 font-semibold text-system-error">{error}</p>}
      {maxLength && (
        <div className="flex flex-row-reverse">
          <span className="text-primary-500">
            {valueLength ? `${valueLength} / ${maxLength}` : `${maxLength} символів`}
          </span>
        </div>
      )}
    </div>
  );
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.string,
};
