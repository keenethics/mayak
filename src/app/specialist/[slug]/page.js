import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { include } from '@/app/specialist/consts';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  const data = await prisma.specialist.findUnique({
    where: {
      id,
    },
    include,
  });

  return (
    <div className="m-5">
      <Link href={'/specialist'} className="bg-gray-500 p-2">
        Back
      </Link>
      <pre className="m-5">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
