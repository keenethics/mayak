import React from 'react';
import P from 'prop-types';
import { HospitalLogo } from '@icons/index';
import { ProfileImage } from '@/app/_components/Card/Shared/ProfileImage';

export function ProfileImageOrganization({ className }) {
  return <ProfileImage source={HospitalLogo} alt="Профільна картинка організації" className={className} />;
}

ProfileImageOrganization.propTypes = {
  className: P.string,
};
