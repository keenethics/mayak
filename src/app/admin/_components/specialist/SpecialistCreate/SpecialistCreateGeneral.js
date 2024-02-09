'use client';

import React from 'react';
import { required, SelectArrayInput, useGetList } from 'react-admin';
import { SPECIALIZATION } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/shared/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';
import { generateTextInputList } from '@/app/admin/_utils/generateTextInputList';

export const SpecialistCreateGeneral = () => {
  const { data: specializations, isLoading: specializationsLoading } = useGetList(SPECIALIZATION);

  const specializationsList = getChoicesList(specializations);

  return (
    <FormFieldWrapper
      title={SpecialistCreateFormBlocks.general}
      className="mt-5"
    >
      <div className="flex w-full gap-6 [&>*]:flex-grow">
        {generateTextInputList(SpecialistFormFields.general)}
      </div>
      <SelectArrayInput
        name={SpecialistFormFields.specializations.name}
        source={SpecialistFormFields.specializations.name}
        label={SpecialistFormFields.specializations.label}
        isLoading={specializationsLoading}
        choices={specializationsList}
        validate={required()}
        fullWidth
      />
    </FormFieldWrapper>
  );
};
