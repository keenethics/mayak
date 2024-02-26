import React from 'react';
import P from 'prop-types';
import { Female, HospitalLogo, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import { cn } from '@/utils/cn';

export function ProfileImage({ gender, className }) {
  let image = <HospitalLogo />;

  if (gender) {
    image = gender === Gender.MALE ? <Male /> : <Female />;
  }

  return (
    <div
      className={cn(
        'md:h-max-[200px] flex items-center justify-center rounded-[16px] bg-gray-100 p-[20px] sm:h-[70px] sm:w-[70px] md:h-[150px] md:w-full lg:h-[200px] lg:w-[200px]',
        className,
      )}
    >
      <svg className="sm:h:-[24px] h:-[24px] w-[24px] sm:w-[24px] md:h-[40px] md:w-[40px] lg:h-[88px] lg:w-[88px]">
        {image}
      </svg>
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
};
