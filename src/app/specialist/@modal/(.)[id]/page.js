import React from 'react';
import { CardSpecialistExtended } from '@/app/_components/CardSpecialist';
import { getSpecialist } from '@/app/specialist/utils';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialist({ id });

  return <CardSpecialistExtended specialist={specialist} />;
}
