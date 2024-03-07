import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export function DisplayMatchingEntity({ entities, label, className }) {
  const numEntities = entities.length;

  return (
    <div className={className}>
      <h3 className="text-p4 text-primary-700">
        {`Знайдені співпадіння за параметром "${label}"`} <span className="font-bold">({numEntities})</span>:
      </h3>
      <ul className="mt-2 flex gap-6">
        {entities?.map(entity => {
          const { id } = entity;
          const hasLastName = entity.lastName;
          const href = hasLastName ? `/admin#/specialist/${id}/show` : `/admin#/organization/${id}/show`;
          const name = hasLastName ? `${entity.lastName} ${entity.firstName}` : `${entity.name}`;

          return (
            <li key={id}>
              <Link
                href={href}
                target="_blank"
                className="rounded bg-primary-300 p-1.5 transition-all hover:bg-primary-200"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

DisplayMatchingEntity.propTypes = {
  entities: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
};
