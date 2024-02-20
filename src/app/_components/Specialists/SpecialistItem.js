import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { prisma } from '@/lib/db';

export async function SpecialistItem({ id }) {
  const specialist = await prisma.specialist.findUnique({ where: { id } });
  return (
    <div className="m-5">
      <Link href={'/specialist'} className="bg-gray-500 p-2">
        Back
      </Link>
      <pre className="m-5">{JSON.stringify(specialist, null, 4)}</pre>
    </div>
  );
}

SpecialistItem.propTypes = {
  id: PropTypes.string,
};
