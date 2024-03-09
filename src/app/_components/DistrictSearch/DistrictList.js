'use client';

import { PillButton } from '@components';
import { Tick } from '@icons/index';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { useState } from 'react';

export function DistrictList({ list, className }) {
  const [selected, setSelected] = useState(0);

  const handleClick = index => {
    setSelected(index);
  };

  return (
    <ul className={cn('mt-4 flex gap-4', className)}>
      {list.map(({ id, name }, index) => {
        const isSelected = index === selected;
        const hasIcon = isSelected ? <Tick /> : null;

        return (
          <li key={id} onClick={() => handleClick(index)}>
            <Link href={`?district=${name}`} className={isSelected ? 'pointer-events-none cursor-none' : ''}>
              <PillButton
                variant="transparent"
                colorVariant="orange"
                icon={hasIcon}
                className={isSelected ? 'border-secondary-300 bg-secondary-300 font-semibold' : ''}
              >
                {name}
              </PillButton>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

DistrictList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};
