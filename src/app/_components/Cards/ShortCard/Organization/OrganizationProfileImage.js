import React from 'react';
import P from 'prop-types';
import Image from 'next/image';
import { HospitalLogo } from '@icons/index';
import { cn } from '@/utils/cn';

function OrganizationProfileImage({ className }) {
  return (
    <div className={cn('flex items-start gap-[10px] rounded-[16px] bg-gray-100 p-[56px] lg:hidden', className)}>
      <Image src={HospitalLogo} alt="Hospital default image" />
    </div>
  );
}
export { OrganizationProfileImage };

OrganizationProfileImage.propTypes = {
  className: P.string,
};
