'use client';

import React from 'react';
import { FormFieldWrapper } from '@/app/admin/_components/shared/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';
import { generateTextInputList } from '@/app/admin/_utils/generateTextInputList';

const SpecialistCreateContacts = () => (
  <FormFieldWrapper title={SpecialistCreateFormBlocks.contacts}>
    <div className="flex gap-4 [&>*]:flex-grow">
      {generateTextInputList(SpecialistFormFields.contacts)}
    </div>
  </FormFieldWrapper>
);

export { SpecialistCreateContacts };
