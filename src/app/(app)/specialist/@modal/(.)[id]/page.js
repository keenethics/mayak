import React from 'react';
import { CardSpecialistExtended, CardOrganizationExtended } from '@/app/_components/CardSpecialist';
import { getOrganizationById, getSpecialistById } from '@/app/(app)/specialist/utils';

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialistById({ id });

  if (specialist) {
    return <CardSpecialistExtended specialist={specialist} />;
  }
  const organization = await getOrganizationById({ id });
  return <CardOrganizationExtended organization={organization} />;
}
