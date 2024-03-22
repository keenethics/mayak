import { OwnershipType } from '@prisma/client';
import PropTypes from 'prop-types';

export function OwnershipTypeTile({ ownershipType }) {
  const translations = {
    [OwnershipType.GOVERNMENT]: 'Державна',
    [OwnershipType.PRIVATE]: 'Приватна',
  };

  return (
    <div className="bg-gray-100 px-3 py-1 text-[0.875rem] font-medium leading-[1.125rem] text-gray-700 ">
      {translations[ownershipType]}
    </div>
  );
}

OwnershipTypeTile.propTypes = {
  ownershipType: PropTypes.oneOf(Object.values(OwnershipType)),
};
