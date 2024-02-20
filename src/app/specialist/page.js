import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export default async function Page() {
  const specialists = await prisma.specialist.findMany();
  return (
    <ul className="m-5">
      {specialists?.map(({ id }) => (
        <li key={id}>
          <Link href={`specialist/${id}`} className="text-primary-700 hover:text-primary-400">
            {id}
          </Link>
        </li>
      ))}
    </ul>
  );
}
