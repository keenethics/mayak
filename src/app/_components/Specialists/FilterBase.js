'use client';

import { useEffect, useRef, useState } from 'react';
import { FilterChip } from '@components/FilterChip';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function FilterBase({ count, children, filterText }) {
  const [opened, setOpened] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && opened) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className="relative">
      <FilterChip
        opened={opened}
        text={filterText}
        count={count}
        onClick={() => {
          setOpened(!opened);
        }}
      />
      <div
        ref={dropdownRef}
        className={cn(`z-10 -mr-[255px] hidden w-max flex-col rounded-3xl border bg-other-white px-2 py-1`, {
          flex: opened,
        })}
      >
        {children}
      </div>
    </div>
  );
}

FilterBase.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
  filterText: PropTypes.string,
};
