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
        'flex h-[70px] w-[70px] items-center justify-center rounded-[16px] bg-gray-100 p-[20px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]',
        className,
      )}
    >
      <svg className="h-[24px] w-[24px] md:h-[40px] md:w-[40px] lg:h-[88px] lg:w-[88px]">{image}</svg>
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
};
