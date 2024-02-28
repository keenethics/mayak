'use client';

import React from 'react';
import { BooleanInput, required, SelectArrayInput, TextInput, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';

export function Services() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const { therapies, isFreeReception, description } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormSections.services}>
      <SelectArrayInput
        name={therapies.name}
        source={therapies.name}
        label={therapies.label}
        isLoading={therapiesLoading}
        choices={therapiesList}
        validate={therapies.isRequired && required()}
        className="w-full"
      />
      <BooleanInput
        name={isFreeReception.name}
        source={isFreeReception.name}
        label={isFreeReception.label}
        className="w-max"
      />
      <TextInput name={description.name} source={description.name} label={description.label} fullWidth multiline />
    </FormFieldWrapper>
  );
}
