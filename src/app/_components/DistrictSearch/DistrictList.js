'use client';

import { Tick } from '@icons/index';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { PillButton } from '@/app/_components';

export function DistrictList({ list, className }) {
  const [selected, setSelected] = useState(0);
  const handleClick = index => {
    setSelected(index);
  };

  return (
    <Swiper slidesPerView="auto" spaceBetween={15} wrapperClass={className}>
      {list.map(({ id, name }, index) => {
        const isSelected = index === selected;
        const hasIcon = isSelected ? <Tick /> : null;

        return (
          <SwiperSlide key={id} onClick={() => handleClick(index)} className="fit-co">
            <Link
              href={`/specialist?district=${id}`}
              className={isSelected ? 'pointer-events-none cursor-none' : ''}
              tabIndex={-1}
            >
              <PillButton
                variant="transparent"
                colorVariant="orange"
                icon={hasIcon}
                className={isSelected ? 'border-secondary-300 bg-secondary-300 font-semibold' : ''}
                aria-label={`Click to see specialists related to the district with id ${id}`}
              >
                {name}
              </PillButton>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
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
