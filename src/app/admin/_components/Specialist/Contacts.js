import React from 'react';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { FormFieldWrapper, TextInputList } from '@admin/components';

export function Contacts() {
  const { phone, email, website } = SpecialistFormFields;
  const contactsList = [phone, email, website];

  return (
    <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
    </FormFieldWrapper>
  );
}
