'use client';

import { Tick } from '@icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { PillButton } from '@components/PillButton';
import { Slide, Slider } from '@components/Slider';
import { clsx } from 'clsx/lite';
import { cn } from '@utils/cn';

export function DistrictList({ list, className }) {
  const [selected, setSelected] = useState(0);
  const handleClick = index => {
    setSelected(index);
  };

  return (
    <Slider slidesPerView="auto" className={cn('flex', className)}>
      {list.map(({ id, name }, index) => {
        const isSelected = index === selected;
        const icon = isSelected ? (
          <span className="text-gray-900">
            <Tick />
          </span>
        ) : null;
        const pillButtonStyle = clsx(isSelected && 'border-secondary-300 bg-secondary-300 font-semibold');
        const linkStyle = clsx(isSelected && 'pointer-events-none cursor-none');

        return (
          <Slide key={id} onClick={() => handleClick(index)} className="mr-3.5 last:mr-0">
            <Link href={`/specialist?district=${id}`} className={linkStyle} tabIndex={-1}>
              <PillButton
                variant="transparent"
                colorVariant="orange"
                icon={icon}
                className={pillButtonStyle}
                aria-label={`Click to see specialists related to the district with id ${id}`}
              >
                {name}
              </PillButton>
            </Link>
          </Slide>
        );
      })}
    </Slider>
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
