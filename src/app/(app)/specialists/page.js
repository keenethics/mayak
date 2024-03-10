import React from 'react';
import { FilterList } from '@/app/_components/Specialists/FilterList';

export const metadata = {
  title: 'Спеціалісти та організації',
  description: 'Спеціалісти та організації',
};

export default function Page() {
  // to use metadata, the components should be server components
  // so, move client components into a separate component
  return (
    <div className="flex flex-col items-center">
      <FilterList />
    </div>
  );
}
