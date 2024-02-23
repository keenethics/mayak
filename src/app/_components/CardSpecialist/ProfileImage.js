import React from 'react';
import P from 'prop-types';
import { Male, Female, HospitalLogo } from '@icons/index';
import { Gender } from '@prisma/client';
import { cn } from '@/utils/cn';

export function ProfileImage({ gender, className }) {
  const { MALE } = Gender;
  const source = () => {
    if (gender) {
      return gender === MALE ? <Male /> : <Female />;
    }
    return <HospitalLogo />;
  };

  return (
    <div
      className={cn(
        'flex min-h-[70px] min-w-[70px] items-center justify-center rounded-[16px] bg-gray-100 md:p-[56px]',
        className,
      )}
    >
      {source()}
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
};
