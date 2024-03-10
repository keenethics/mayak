'use client';

import ArrowIconDown from '@icons/arrowDown.svg';
import ArrowIconUp from '@icons/arrowUp.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function FilterChip({ text }) {
  const [opened, setOpened] = useState(false);
  // const [filterCount, setFilterCount] = useState(null);
  return (
    <div
      className={cn(
        'group relative flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-3xl border border-gray-700 px-3 py-1.5 hover:bg-gray-200',
        { 'bg-primary-200 text-primary-500': opened },
      )}
      onClick={() => setOpened(!opened)}
    >
      <p className="">{text}</p>
      {/* <span>{filterCount}</span> */}
      {opened ? <ArrowIconDown /> : <ArrowIconUp />}
    </div>
  );
}

FilterChip.propTypes = {
  text: PropTypes.string,
};
