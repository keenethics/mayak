import React from 'react';
import { CardSpecialist, CardOrganization } from '@/app/_components/CardSpecialist';
import { getSpecialistById, getOrganizationById } from '@/app/(app)/specialist/utils';

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const specialist = await getSpecialistById({ id });
    let name;
    let description;

    if (specialist) {
      name = `${specialist.lastName} ${specialist.firstName}`;
      description = specialist.description;
      return { name, description };
    }
    const organization = await getOrganizationById({ id });
    if (organization) {
      name = organization.name;
      description = organization.description;
      return { name, description };
    }

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
  const cardStyle = 'mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0';

  const specialist = await getSpecialistById({ id });
  if (specialist) {
    return <CardSpecialist specialist={specialist} extended className={cardStyle} />;
  }
  const organization = await getOrganizationById({ id });
  return <CardOrganization organization={organization} extended className={cardStyle} />;
}
