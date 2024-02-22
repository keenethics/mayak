import React from 'react';
import P from 'prop-types';
import Image from 'next/image';
import { cn } from '@/utils/cn';

export function ProfileImage({ source, alt, className }) {
  return (
    <div
      className={cn(
        'flex min-h-[70px] min-w-[70px] items-center justify-center rounded-[16px] bg-gray-100 md:p-[56px]',
        className,
      )}
    >
      <Image src={source} alt={alt} className="h-[24px] w-[24px] md:min-h-[88px] md:min-w-[88px]" />
    </div>
  );
}

ProfileImage.propTypes = {
  source: P.string,
  alt: P.string,
  className: P.string,
};
