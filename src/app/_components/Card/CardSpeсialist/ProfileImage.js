import React from 'react';
import P from 'prop-types';
import { Male, Female, HospitalLogo } from '@icons/index';
import { cn } from '@/utils/cn';

export function ProfileImage({ gender, className }) {
  let image = <HospitalLogo />;
  if (gender) {
    image = gender === 'MALE' ? <Male /> : <Female />;
  }

  return (
    <div
      className={cn(
        'flex min-h-[70px] min-w-[70px] items-center justify-center rounded-[16px] bg-gray-100 md:p-[56px]',
        className,
      )}
    >
      {image}
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
};
