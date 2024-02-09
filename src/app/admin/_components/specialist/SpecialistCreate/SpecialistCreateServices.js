'use client';

import React from 'react';
import {
  BooleanInput,
  required,
  SelectArrayInput,
  TextInput,
  useGetList,
} from 'react-admin';
import { THERAPY } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/shared/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

const SpecialistCreateServices = () => {
  const { data: therapies, isLoading: therapiesLoading } = useGetList(THERAPY);
  const therapiesList = getChoicesList(therapies);

  return (
    <FormFieldWrapper title={SpecialistCreateFormBlocks.services}>
      <SelectArrayInput
        name={SpecialistFormFields.therapies.name}
        source={SpecialistFormFields.therapies.name}
        label={SpecialistFormFields.therapies.label}
        isLoading={therapiesLoading}
        choices={therapiesList}
        className="w-full"
        validate={required()}
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
        label={SpecialistFormFields.isFreeReception.label}
        fullWidth
        multiline
      />
    </FormFieldWrapper>
  );
};

export { SpecialistCreateServices };
