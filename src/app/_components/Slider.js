'use client';

import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';

import 'swiper/css';

export function Slider({ slidesPerView = 'auto', spaceBetween = 15, children, className }) {
  return (
    <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} wrapperClass={className}>
      {children}
    </Swiper>
  );
}

Slider.propTypes = {
  slidesPerView: PropTypes.string,
  spaceBetween: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};
