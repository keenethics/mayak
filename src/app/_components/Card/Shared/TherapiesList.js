import React from 'react';
import P from 'prop-types';

export function TherapiesList({ therapies, className }) {
  return (
    <div className={className}>
      <h3 className="text-p4 font-bold uppercase text-gray-600">Напрямок лікування</h3>
      <ul className="mt-[14px] flex flex-wrap gap-[10px]">
        {therapies.map(t => (
          <li key={t} className="rounded-[24px] bg-primary-100 px-[12px] py-[4x] text-c3 text-primary-600">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

TherapiesList.propTypes = {
  therapies: P.array,
  className: P.string,
};
