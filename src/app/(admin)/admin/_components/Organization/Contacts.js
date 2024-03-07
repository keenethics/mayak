import React from 'react';
import { useWatch } from 'react-hook-form';
import { TextInput, useGetList } from 'react-admin';
import PropTypes from 'prop-types';
import { RESOURCES } from '@admin/_lib/consts';
import { DisplayMatchingEntity } from '@admin/components/DisplayMatchingEntity';

export function Contacts({ className }) {
  const currentPhone = useWatch({ name: 'phone' });
  const currentEmail = useWatch({ name: 'email' });

  const { data: specialistData } = useGetList(RESOURCES.specialist);
  const { data: organizationData } = useGetList(RESOURCES.organization);

  const allEntities = specialistData?.concat(organizationData);

  const entitiesMatchingPhone = allEntities?.filter(specialist => specialist.phone === currentPhone);
  const entitiesMatchingEmail = allEntities?.filter(specialist => specialist.email === currentEmail);

  const numEntitiesMatchingPhone = entitiesMatchingPhone?.length;
  const numEntitiesMatchingEmail = entitiesMatchingEmail?.length;

  return (
    <>
      <div className={className}>
        <TextInput label="Номер телефону" source="phone" />
        <TextInput label="Пошта" source="email" />
        <TextInput label="Вебсайт" source="website" />
      </div>
      <div className="mb-8 flex flex-col gap-6">
        {currentPhone && numEntitiesMatchingPhone > 0 && (
          <DisplayMatchingEntity entities={entitiesMatchingPhone} label="телефон" />
        )}
        {currentEmail && numEntitiesMatchingEmail > 0 && (
          <DisplayMatchingEntity entities={entitiesMatchingEmail} label="пошта" />
        )}
      </div>
    </>
  );
}

Contacts.propTypes = {
  className: PropTypes.string,
};
