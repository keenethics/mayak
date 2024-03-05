import React from 'react';
import { CardSpecialist } from '@/app/_components/CardSpecialist/Specialist';
import { getSpecialist } from '@/app/(app)/specialist/utils';

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const specialist = await getSpecialist({ id });
    const name = specialist.gender ? `${specialist.lastName} ${specialist.firstName}` : specialist.name;

    return {
      name,
      description: specialist.description,
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
  const specialist = await getSpecialist({ id });

  return (
    <CardSpecialist specialist={specialist} extended className="mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0" />
  );
}
