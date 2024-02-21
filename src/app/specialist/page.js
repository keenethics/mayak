import React from 'react';
import Link from 'next/link';
import { getAll } from '@/app/specialist/specialistService';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const { data, error } = await getAll();

  if (error) {
    throw new Error(error);
  }

  return (
    <ul className="m-5">
      {data.map(({ id }) => (
        <li key={id}>
          <Link href={`specialist/${id}`} className="text-primary-700 hover:text-primary-400">
            {id}
          </Link>
        </li>
      ))}
    </ul>
  );
}
