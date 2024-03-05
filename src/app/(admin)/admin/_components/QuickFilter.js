import React from 'react';
import PropTypes from 'prop-types';

export function QuickFilter({ label }) {
  return (
    <div className="mb-1 rounded-full bg-[#2194f3] px-4 py-2 text-other-white shadow-[0px_0px_7px_1px_rgba(0,0,0,0.2)]">
      {label}
    </div>
  );
}

QuickFilter.propTypes = {
  label: PropTypes.string,
};
