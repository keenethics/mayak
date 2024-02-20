import React from 'react';
import { SpecialistItem } from '@/app/_components/Specialists';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  return (
    <>
      <SpecialistItem id={id} />
    </>
  );
}
