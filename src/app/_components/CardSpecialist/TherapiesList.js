import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function TherapiesList({ therapies, className }) {
  return (
    <div className={cn('border-t border-dashed border-t-gray-200 pt-4 md:pt-3', className)}>
      <h3 className="text-p4 font-bold uppercase tracking-wide text-gray-600">Напрямок лікування</h3>
      <ul className="mt-3.5 flex flex-wrap gap-2.5">
        {therapies.map(therapy => (
          <li key={therapy} className="rounded-3xl bg-primary-100 px-3 py-1 text-c3 text-primary-600">
            {therapy}
          </li>
        ))}
      </ul>
    </div>
  );
}

TherapiesList.propTypes = {
  therapies: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};
