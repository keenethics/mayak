'use client';

import React from 'react';
import { required, SelectArrayInput, useGetList } from 'react-admin';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@/app/admin/_lib/specialistData';
import { TextInputList } from '@/app/admin/_components/TextInputList';

export function General() {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  const { name, label, isRequired } = SpecialistFormFields.specializations;

  const { lastName, firstName, surname } = SpecialistFormFields;
  const generalInfoList = [lastName, firstName, surname];

  return (
    <FormFieldWrapper title={SpecialistFormSections.general}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={generalInfoList} />
      </div>
      <SelectArrayInput
        name={name}
        source={name}
        label={label}
        isLoading={specializationsLoading}
        choices={specializationsList}
        validate={isRequired && required()}
        fullWidth
      />
    </FormFieldWrapper>
  );
}
