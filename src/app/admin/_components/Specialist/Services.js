'use client';

import React from 'react';
import { BooleanInput, required, SelectArrayInput, TextInput, useGetList } from 'react-admin';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@/app/admin/_lib/specialistData';

export function Services() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const { therapies, isFreeReception, description } = SpecialistFormFields;

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));
  return (
    <FormFieldWrapper title={SpecialistFormSections.services}>
      <SelectArrayInput
        name={therapies.name}
        source={therapies.name}
        label={therapies.label}
        isLoading={therapiesLoading}
        choices={therapiesChoices}
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
