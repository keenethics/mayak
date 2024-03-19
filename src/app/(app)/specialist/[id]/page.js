import React from 'react';
import { CardSpecialist, CardOrganization } from '@/app/_components/CardSpecialist';
import { getSpecialistById, getOrganizationById } from '@/app/(app)/specialist/utils';

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const specialist = await getSpecialistById({ id });
    const organization = await getOrganizationById({ id });

    const name = specialist ? `${specialist.lastName} ${specialist.firstName}` : organization.name;
    const description = specialist ? specialist.description : organization.description;

    return {
      name,
      description,
    };
  } catch (e) {
    return {
      name: '',
      description: '',
    };
  }
}

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialistById({ id });
  const organization = await getOrganizationById({ id });

  return specialist ? (
    <CardSpecialist specialist={specialist} extended className="mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0" />
  ) : (
    <CardOrganization
      organization={organization}
      extended
      className="mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0"
    />
  );
}
