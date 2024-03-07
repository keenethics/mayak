import React from 'react';
import { MatchingEntityListItem } from '@admin/components/MatchingEntityListItem';
import { useFindMatchingEntities } from '@admin/_hooks/common';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { EMAIL, PHONE } from '@admin/_lib/consts';

export function MatchingEntityList({ matchingParams, className }) {
  const { phone, email } = matchingParams;

  const { data: entitiesMatchingPhone, num: numEntitiesMatchingPhone } = useFindMatchingEntities({
    key: PHONE,
    value: phone,
  });
  const { data: entitiesMatchingEmail, num: numEntitiesMatchingEmail } = useFindMatchingEntities({
    key: EMAIL,
    value: email,
  });

  const hasEntitiesMatchingPhone = phone && numEntitiesMatchingPhone > 0;
  const hasEntitiesMatchingEmail = email && numEntitiesMatchingEmail > 0;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {hasEntitiesMatchingPhone && <MatchingEntityListItem entities={entitiesMatchingPhone} label="телефон" />}
      {hasEntitiesMatchingEmail && <MatchingEntityListItem entities={entitiesMatchingEmail} label="пошта" />}
    </div>
  );
}

MatchingEntityList.propTypes = {
  matchingParams: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  className: PropTypes.string,
};
