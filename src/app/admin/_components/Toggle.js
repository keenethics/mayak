import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ onChange, caption }) => (
  <div className="m-4">
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" onChange={onChange} className="peer sr-only" />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-other-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-other-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-400 rtl:peer-checked:after:-translate-x-full dark:border-gray-800 dark:bg-gray-900 dark:peer-focus:ring-primary-800"></div>
      <span className="text-sm ms-3 font-bold text-gray-900 dark:text-gray-300">
        {caption}
      </span>
    </label>
  </div>
);

Toggle.propTypes = {
  onChange: PropTypes.func,
  caption: PropTypes.string,
};

export { Toggle };
