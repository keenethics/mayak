import React from 'react';
import P from 'prop-types';
import { Female, HospitalLogo, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import { cn } from '@/utils/cn';
import { specialistSocialsPropType } from './prop-types';
import { SocialsList } from './SocialsList';

export function ProfileImage({ gender, className, socials }) {
  let image = <HospitalLogo />;

  if (gender) {
    image = gender === Gender.MALE ? <Male /> : <Female />;
  }

  return (
    <div
      className={cn(
        'relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-[16px] bg-gray-100 p-[20px] md:h-[150px] md:w-[150px] md:gap-[15px] md:p-[15px] lg:h-[200px] lg:w-[200px]',
        className,
      )}
    >
      <svg className="h-[24px] w-[24px] md:h-[40px] md:w-[40px] lg:h-[88px] lg:w-[88px]">{image}</svg>
      <SocialsList socials={socials} className="absolute bottom-[14px] lg:bottom-[18px]" />
    </div>
  );
}

ProfileImage.propTypes = {
  gender: P.string,
  className: P.string,
  socials: P.arrayOf(specialistSocialsPropType),
};
