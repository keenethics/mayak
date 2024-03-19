'use client';

import { Tick } from '@icons/index';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { PillButton } from '@components/PillButton';
import { Slider } from '@components/Slider';
import { clsx } from 'clsx/lite';

export function List({ list, className }) {
  const [selected, setSelected] = useState(0);
  const handleClick = index => {
    setSelected(index);
  };

  return (
    <Slider className={className}>
      {list.map(({ id, name }, index) => {
        const isSelected = index === selected;
        const hasIcon = isSelected ? <Tick /> : null;
        const pillButtonStyle = clsx(isSelected && 'border-secondary-300 bg-secondary-300 font-semibold');
        const linkStyle = clsx(isSelected && 'pointer-events-none cursor-none');

        return (
          <SwiperSlide key={id} onClick={() => handleClick(index)}>
            <Link href={`/specialist?district=${id}`} className={linkStyle} tabIndex={-1}>
              <PillButton
                variant="transparent"
                colorVariant="orange"
                icon={hasIcon}
                className={pillButtonStyle}
                aria-label={`Click to see specialists related to the district with id ${id}`}
              >
                {name}
              </PillButton>
            </Link>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};
