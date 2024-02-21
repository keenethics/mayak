import React from 'react';
import P from 'prop-types';
import Image from 'next/image';
import { Female, Male } from '@icons/index';
import { Gender } from '@prisma/client';
import { cn } from '@/utils/cn';

export function SpecialistProfileImage({ className }) {
  const { MALE } = Gender;
  const source = MALE ? Male : Female;

  return (
    <div
      className={cn(
        'flex min-h-[70px] min-w-[70px] items-center justify-center rounded-[16px] bg-gray-100 md:p-[56px]',
        className,
      )}
    >
      <Image
        src={source}
        alt="Specialist default image"
        className="h-[24px] w-[24px] md:min-h-[88px] md:min-w-[88px]"
      />
    </div>
  );
}

SpecialistProfileImage.propTypes = {
  className: P.string,
};
