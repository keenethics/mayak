import React from 'react';
import P from 'prop-types';
import Image from 'next/image';
import { Female, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import { cn } from '@/utils/cn';

function SpecialistProfileImage({ className }) {
  const { MALE } = Gender;
  return (
    <div className={cn('flex items-start gap-[10px] rounded-[16px] bg-gray-100 p-[56px] lg:hidden', className)}>
      <Image src={MALE ? Male : Female} alt="Specialist default image" />
    </div>
  );
}
export { SpecialistProfileImage };

SpecialistProfileImage.propTypes = {
  className: P.string,
};
