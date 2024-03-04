import React from 'react';

// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,

export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export default function Page() {
  return <div className="mx-auto mt-4 max-w-[900px] px-4">Main</div>;
}
