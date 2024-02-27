import React from 'react';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@/app/admin/_lib/specialistData';
import { TextInputList } from '@/app/admin/_components/TextInputList';

export function Contacts() {
  const { phone, email, website, instagram, facebook, youtube, linkedin, tiktok } = SpecialistFormFields;
  const contactsList = [phone, email, website];
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok];

  return (
    <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-8 ">
        <TextInputList textInputList={socialMediaList} />
      </div>
    </FormFieldWrapper>
  );
}
