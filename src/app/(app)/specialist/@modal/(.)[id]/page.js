import React from 'react';
import { CardSpecialistExtended } from '@/app/_components/CardSpecialist';
import { getSpecialist } from '@/app/(app)/specialist/utils';

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialist({ id });

  return <CardSpecialistExtended specialist={specialist} />;
}
