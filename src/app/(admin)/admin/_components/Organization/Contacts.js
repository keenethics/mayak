import React from 'react';
import { useWatch } from 'react-hook-form';
import { TextInput } from 'react-admin';
import PropTypes from 'prop-types';
import { DisplayMatchingEntity } from '@admin/components/DisplayMatchingEntity';
import { useFindMatchingEntities } from '@admin/_hooks/common';

export function Contacts({ className }) {
  const PHONE = 'phone';
  const EMAIL = 'email';

  const currentPhone = useWatch({ name: PHONE });
  const currentEmail = useWatch({ name: EMAIL });

  const { data: entitiesMatchingPhone, num: numEntitiesMatchingPhone } = useFindMatchingEntities({
    key: PHONE,
    value: currentPhone,
  });
  const { data: entitiesMatchingEmail, num: numEntitiesMatchingEmail } = useFindMatchingEntities({
    key: EMAIL,
    value: currentEmail,
  });

  const hasEntitiesMatchingPhone = currentPhone && numEntitiesMatchingPhone > 0;
  const hasEntitiesMatchingEmail = currentEmail && numEntitiesMatchingEmail > 0;

  return (
    <>
      <div className={className}>
        <TextInput label="Номер телефону" source="phone" />
        <TextInput label="Пошта" source="email" />
        <TextInput label="Вебсайт" source="website" />
      </div>
      <div className="mb-6 flex flex-col gap-6">
        {hasEntitiesMatchingPhone && (
          <DisplayMatchingEntity entities={entitiesMatchingPhone} label="телефон" />
        )}
        {hasEntitiesMatchingEmail && (
          <DisplayMatchingEntity entities={entitiesMatchingEmail} label="пошта" />
        )}
      </div>
    </>
  );
}

Contacts.propTypes = {
  className: PropTypes.string,
};
