'use client';

import React from 'react';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormBlocks, SpecialistFormFields } from '@/app/admin/_lib/specialistData';
import { generateTextInputList } from '@/app/admin/_utils/generateTextInputList';

const Contacts = () => (
  <FormFieldWrapper title={SpecialistFormBlocks.contacts} className="mt-3">
    <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
      {generateTextInputList(SpecialistFormFields.contacts)}
    </div>
  </FormFieldWrapper>
);

export { Contacts };
