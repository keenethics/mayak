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
    <div className={cn('flex items-center justify-center rounded-[16px] bg-gray-100 p-[20px] md:p-[56px]', className)}>
      <svg viewBox="0 0 70 80" className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]">
        {image}
      </svg>
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
};
