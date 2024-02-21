import React from 'react';
import { ShortCardMain } from '@/app/_components/Cards/ShortCard/ShortCardMain';

// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,

export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export default function Page() {
  return (
    <div>
      Main
      {<ShortCardMain />}
    </div>
  );
}
