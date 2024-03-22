import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swiper } from 'swiper/react';

// eslint-disable-next-line import/no-extraneous-dependencies
export { SwiperSlide as Slide } from 'swiper/react';

export function Slider({ children, className, ...swiperProps }) {
  return (
    <Swiper {...swiperProps} wrapperClass={className}>
      {children}
    </Swiper>
  );
}

Slider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  swiperProps: PropTypes.object,
};
