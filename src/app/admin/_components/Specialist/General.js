'use client';

import React from 'react';
import { required, SelectArrayInput, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper, TextInputList } from '@admin/components';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';

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
