import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { TextInputList } from '@admin/components/TextInputList';

export function SocialLinks() {
  const { instagram, facebook, youtube, linkedin, tiktok, viber, telegram } = SpecialistFormFields;
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

  return (
    <FormFieldWrapper title={SpecialistFormSections.socialLinks} className="mt-3">
      <div className="grid w-full gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        <TextInputList textInputList={socialMediaList} className="" />
      </div>
    </FormFieldWrapper>
  );
}
