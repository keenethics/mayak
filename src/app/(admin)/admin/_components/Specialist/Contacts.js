import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { TextInputList } from '@admin/components/TextInputList';
import { useWatch } from 'react-hook-form';
import { useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { DisplayMatchingEntity } from '@admin/components/DisplayMatchingEntity';

export function Contacts() {
  const { phone, email, website } = SpecialistFormFields;
  const contactsList = [phone, email, website];

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
    <FormFieldWrapper title={SpecialistFormSections.contacts}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
      <div className="mb-8">
        {currentPhone && numEntitiesMatchingPhone > 0 && (
          <DisplayMatchingEntity entities={entitiesMatchingPhone} label="телефон" />
        )}
        {currentEmail && numEntitiesMatchingEmail > 0 && (
          <DisplayMatchingEntity entities={entitiesMatchingEmail} label="пошта" className="mt-8" />
        )}
      </div>
    </FormFieldWrapper>
  );
}
