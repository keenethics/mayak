'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from '@components/CardSpecialist';
import { useListEntries } from '@hooks';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export function SpecialistList({ className }) {
  const searchParams = useSearchParams();
  const { data, isLoading } = useListEntries(searchParams.toString());
  const cardStyle = 'my-6 max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 md:my-10 md:p-10 lg:mx-auto';
  if (isLoading)
    return (
      <div className="mx-auto w-max">
        <CircularProgress size={50} />
      </div>
    );
  if (data) {
    const { data: specialists, totalCount } = data;
    return (
      <>
        <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} результатів`}</p>
        <ul className={className}>
          {specialists.map(specialist => (
            <li id={specialist.id} key={specialist.id}>
              {specialist.gender ? (
                <CardSpecialist className={cardStyle} specialist={specialist} />
              ) : (
                <CardOrganization className={cardStyle} organization={specialist} />
              )}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

SpecialistList.propTypes = {
  className: PropTypes.string,
};
