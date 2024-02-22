import React from 'react';
import P from 'prop-types';
import { Female, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import { ProfileImage } from '@/app/_components/Card/Shared/ProfileImage';

export function ProfileImageSpecialist({ className, gender }) {
  const { MALE } = Gender;
  const source = gender === MALE ? Male : Female;

  return <ProfileImage source={source} alt="Профільна картинка спеціаліста" className={className} />;
}

ProfileImageSpecialist.propTypes = {
  className: P.string,
  gender: P.string,
};
