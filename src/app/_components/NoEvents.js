import React from 'react';
import SadIcon from '@icons/sad-search.svg';

export function NoEvents() {
  return (
    <div className="no-wrap flex w-full flex-shrink-0 flex-col items-center justify-center gap-[40px] bg-gray-100 sm:h-[250px] sm:gap-[15px] md:h-[300px] lg:h-[400px]">
      <SadIcon className="h-[121px] w-[121px] text-gray-300" />
      <p className="text-center text-p4 text-primary-600">Немає подій для відображення</p>
    </div>
  );
}
