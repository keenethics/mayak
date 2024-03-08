import React from 'react';
import { useFindEntityMatchingPhoneOrEmail } from '@admin/_hooks/useFindEntityMatchingPhoneOrEmail';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { MatchingEntityListItem } from '@admin/components/MatchingEntityListItem';
import { EMAIL, PHONE } from '@admin/_lib/consts';

export function MatchingEntityList({ matchingParams, className }) {
  const { phone, email } = matchingParams;

  const { data: entitiesMatchingPhone, num: numEntitiesMatchingPhone } = useFindEntityMatchingPhoneOrEmail({
    key: PHONE,
    value: phone,
  });

  const { data: entitiesMatchingEmail, num: numEntitiesMatchingEmail } = useFindEntityMatchingPhoneOrEmail({
    key: EMAIL,
    value: email,
  });

  const hasEntitiesMatchingPhone = !!phone && !!numEntitiesMatchingPhone;
  const hasEntitiesMatchingEmail = !!email && !!numEntitiesMatchingEmail;

  const noteIndicator = ({ isActive }) => {
    const bgColor = isActive ? 'bg-primary-300' : 'bg-secondary-300';
    const text = isActive ? 'активовані' : 'неактивовані';
    return (
      <p>
        <span className={cn('inline-block h-2.5 w-2.5', bgColor)} /> - {text}
      </p>
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {hasEntitiesMatchingPhone && <MatchingEntityListItem entities={entitiesMatchingPhone} label="телефон" />}
      {hasEntitiesMatchingEmail && <MatchingEntityListItem entities={entitiesMatchingEmail} label="пошта" />}
      <div className="text-p4">
        {noteIndicator({ isActive: true })}
        {noteIndicator({ isActive: false })}
      </div>
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
