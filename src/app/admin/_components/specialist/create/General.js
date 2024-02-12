'use client';

import React from 'react';
import { required, SelectArrayInput, useGetList } from 'react-admin';
import { Resources } from '@/app/admin/_lib/consts';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistCreateFormBlocks, SpecialistFormFields } from '@/app/admin/_lib/specialistData';
import { generateTextInputList } from '@/app/admin/_utils/generateTextInputList';

export const General = () => {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(Resources.specialization);

  const { name, label, validate } = SpecialistFormFields.specializations;

  return (
    <FormFieldWrapper title={SpecialistCreateFormBlocks.general}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        {generateTextInputList(SpecialistFormFields.general)}
      </div>
      <SelectArrayInput
        name={name}
        source={name}
        label={label}
        isLoading={specializationsLoading}
        choices={specializationsList}
        validate={validate && required()}
        fullWidth
      />
    </FormFieldWrapper>
  );
};
