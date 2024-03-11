import React from 'react';
import { Therapies } from '@components';

export const metadata = {
  title: 'Терапія',
  description: 'Опис сторінки терапії',
};

export default function Page() {
  // to use metadata, the components should be server components
  // so, move client components into a separate component
  return (
    <div>
      <Therapies />
    </div>
  );
}
