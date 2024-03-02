import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import { borderStyle } from '@/app/_components/Card/CardSpeсialist/config';

export function TherapiesList({ therapies, className }) {
  return (
    <div className={cn('border-t pt-[16px] md:pt-[12px]', borderStyle, className)}>
      <h3 className="text-p4 font-bold uppercase tracking-wide text-gray-600">Напрямок лікування</h3>
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
  therapies: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};
