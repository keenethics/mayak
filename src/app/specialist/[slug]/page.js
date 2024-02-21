import React from 'react';
import Link from 'next/link';
import { getById } from '@/app/specialist/specialistService';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  const { data, error } = await getById({ id });

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="m-5">
      <Link href={'/specialist'} className="bg-gray-500 p-2">
        Back
      </Link>
      <pre className="m-5">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
