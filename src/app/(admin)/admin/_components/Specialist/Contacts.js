import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { TextInputList } from '@admin/components/TextInputList';
import { useWatch } from 'react-hook-form';
import { DisplayMatchingEntity } from '@admin/components/DisplayMatchingEntity';
import { useFindMatchingEntities } from '@admin/_hooks/common';

export function Contacts() {
  const PHONE = 'phone';
  const EMAIL = 'email';

  const { phone, email, website } = SpecialistFormFields;
  const contactsList = [phone, email, website];

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
    <FormFieldWrapper title={SpecialistFormSections.contacts}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
      {hasEntitiesMatchingPhone ||
        (hasEntitiesMatchingEmail && (
          <div className="mb-8 flex flex-col gap-6">
            {hasEntitiesMatchingPhone && <DisplayMatchingEntity entities={entitiesMatchingPhone} label="телефон" />}
            {hasEntitiesMatchingEmail && <DisplayMatchingEntity entities={entitiesMatchingEmail} label="пошта" />}
          </div>
        ))}
    </FormFieldWrapper>
  );
}
