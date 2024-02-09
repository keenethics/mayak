'use client';

import React from 'react';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';
import { generateTextInputList } from '@/app/admin/_utils/generateTextInputList';

const Contacts = () => (
  <FormFieldWrapper
    title={SpecialistCreateFormBlocks.contacts}
    className="mt-3"
  >
    <div className="flex gap-4 [&>*]:flex-grow">
      {generateTextInputList(SpecialistFormFields.contacts)}
    </div>
  </FormFieldWrapper>
);

export { Contacts };
