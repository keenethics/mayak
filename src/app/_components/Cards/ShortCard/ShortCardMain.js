import React from 'react';
import { cn } from '@/utils/cn';
import { ContactsSectionWrap } from '../ContactsSectionWrap';
import { InfoSection } from '../InfoSection';

export function ShortCardMain() {
  return (
    <div className={cn('flex w-full gap-4 rounded-3xl border-2 border-gray-200 bg-other-white px-6 pb-8 pt-6')}>
      <ContactsSectionWrap />
      <InfoSection />
    </div>
  );
}
