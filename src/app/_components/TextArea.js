'use client';

import PropTypes from 'prop-types';

export function TextArea({
  value, onChange, maxLength, placeholder,
}) {
  return (
    <div className="flex h-full flex-col gap-0.5">
      <textarea
        className="appereance-none grow resize-none rounded-xl border-none text-gray-900"
        value={value}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {maxLength && (
        <div className="flex flex-row-reverse">
          <span className="text-primary-500">
            {String(value).length} / {maxLength}
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
};
