'use client';

import React from 'react';
import {
  BooleanInput,
  SelectArrayInput,
  TextInput,
  useGetList,
} from 'react-admin';
import { Resources } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

const Services = () => {
  const { data: therapies, isLoading: therapiesLoading } = useGetList(
    Resources.therapy,
  );
  const therapiesList = getChoicesList(therapies);

  return (
    <FormFieldWrapper
      title={SpecialistCreateFormBlocks.services}
      className="mt-7"
    >
      <SelectArrayInput
        name={SpecialistFormFields.therapies.name}
        source={SpecialistFormFields.therapies.name}
        label={SpecialistFormFields.therapies.label}
        isLoading={therapiesLoading}
        choices={therapiesList}
        className="w-full"
      />
      <BooleanInput
        name={SpecialistFormFields.isFreeReception.name}
        source={SpecialistFormFields.isFreeReception.name}
        label={SpecialistFormFields.isFreeReception.label}
        className="w-max"
      />
      <TextInput
        name={SpecialistFormFields.description.name}
        source={SpecialistFormFields.description.name}
        label={SpecialistFormFields.description.label}
        fullWidth
        multiline
      />
    </FormFieldWrapper>
  );
};

export { Services };
