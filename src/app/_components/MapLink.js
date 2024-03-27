import { PillButton } from '@components/PillButton';
import { Map } from '@icons';
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import Link from 'next/link';

export function MapLink({ mapMode = false, className }) {
  const buttonText = mapMode ? 'Показати список' : 'Шукати на карті';
  const href = mapMode ? '/specialist' : '/specialist?mode=map';
  return (
    <Link href={href} aria-label="">
      <PillButton
        icon={<Map />}
        variant="filled"
        colorVariant="orange"
        className={cn('fixed bottom-20 left-[50%] z-10 m-0 flex translate-x-[-50%] items-center', className)}
      >
        {buttonText}
      </PillButton>
    </Link>
  );
}

MapLink.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
};
