'use client';

import React from 'react';
import {
  BooleanInput, SelectArrayInput, TextInput, useGetList,
} from 'react-admin';
import { Resources } from '@/app/admin/_lib/consts';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistCreateFormBlocks, SpecialistFormFields } from '@/app/admin/_lib/specialistData';

const Services = () => {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(Resources.therapy);

  const { therapies, isFreeReception, description } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistCreateFormBlocks.services}>
      <SelectArrayInput
        name={therapies.name}
        source={therapies.name}
        label={therapies.label}
        isLoading={therapiesLoading}
        choices={therapiesList}
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
};

export { Services };
