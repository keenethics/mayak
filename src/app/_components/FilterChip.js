'use client';

import ArrowIconDown from '@icons/arrowDown.svg';
import ArrowIconUp from '@icons/arrowUp.svg';
import Ellipse from '@icons/ellipse.svg';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function FilterChip({ text, opened, setOpened, count }) {
  return (
    <div
      className={cn(
        'group relative flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-3xl border border-gray-700 px-3 py-1.5 hover:bg-gray-200',
        { 'bg-primary-200': opened },
      )}
      onClick={() => setOpened(!opened)}
    >
      <p className={cn('text-p4', { 'text-primary-500': opened })}>{text}</p>
      <div className={cn('relative h-[15px] w-[15px]', { hidden: count === 0 })}>
        <Ellipse />
        <p className="absolute left-[4px] top-[2px] text-c5 font-bold text-primary-500">{count}</p>
      </div>
      {opened ? <ArrowIconDown /> : <ArrowIconUp />}
    </div>
  );
}

FilterChip.propTypes = {
  text: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  count: PropTypes.number,
};
