import React from 'react';
import { CardSpecialistExtended } from '@/app/_components/Card/CardSpecialist';
import { getSpecialist } from '@/app/specialist/utils';

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialist({ id });

  return <CardSpecialistExtended specialist={specialist} />;
}
