import React from 'react';
import { Female, HospitalLogo, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function ProfileImage({ children, gender, className }) {
  let image = <HospitalLogo />;

  if (gender) {
    image = gender === Gender.MALE ? <Male /> : <Female />;
  }

  return (
    <div
      className={cn(
        'flex h-[70px] min-w-[70px] flex-col items-center justify-center rounded-[16px] bg-gray-100 p-[20px] md:h-[150px] md:w-[150px] md:gap-[15px] md:p-[15px] lg:h-[200px] lg:w-[200px]',
        className,
      )}
    >
      <svg className="h-[24px] w-[24px] md:h-[40px] md:w-[40px] lg:h-[88px] lg:w-[88px]">{image}</svg>
      {children}
    </div>
  );
}

ProfileImage.propTypes = {
  children: PropTypes.node,
  gender: PropTypes.string,
  className: PropTypes.string,
};
