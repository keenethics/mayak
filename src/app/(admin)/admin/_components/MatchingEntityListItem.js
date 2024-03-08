import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function MatchingEntityListItem({ entities, label, className }) {
  const numEntities = entities.length;

  return (
    <div className={className}>
      <h3 className="text-p4 text-primary-700">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Знайдені співпадіння за параметром "{label}" <span className="font-bold">({numEntities})</span>:
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {numEntities > 0 &&
          entities?.map(entity => {
            const { id, isOrganization, isActive } = entity;
            const href = isOrganization ? `/admin#/organization/${id}/show` : `/admin#/specialist/${id}/show`;
            const name = isOrganization ? `${entity.name}` : `${entity.lastName} ${entity.firstName}`;

            const bgColor = isActive
              ? 'bg-primary-300 hover:bg-primary-200'
              : 'bg-secondary-300 hover:bg-secondary-200';

            return (
              <li key={id}>
                <Link href={href} target="_blank" className={cn('rounded  p-1.5 transition-all', bgColor)}>
                  {name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

MatchingEntityListItem.propTypes = {
  entities: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
};
