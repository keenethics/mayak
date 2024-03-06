import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { TextInputList } from '@admin/components/TextInputList';

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
