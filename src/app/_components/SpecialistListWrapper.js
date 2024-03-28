'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { MapLink } from '@components/MapLink';
import { cn } from '@utils/cn';
import { SpecialistList } from '@components/Specialists/SpecialistList';

export function SpecialistListWrapper({ className }) {
  const searchParams = useSearchParams();
  const isMapMode = searchParams.get('mode') === 'map';

  return (
    <>
      <MapLink mapMode={!!isMapMode} className={cn({ hidden: isMapMode })} />
      <SpecialistList className="mt-5 md:mt-6" mapMode={!!isMapMode}>
        <div
          className={cn(
            'relative mt-4 grid h-[450px] place-content-center bg-primary-300',
            { hidden: !isMapMode },
            className,
          )}
        >
          <span>Map</span>
          <MapLink mapMode={!!isMapMode} className="absolute bottom-auto left-3 top-3 translate-x-0" />
        </div>
      </SpecialistList>
    </>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
};
