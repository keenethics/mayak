'use client';

import React from 'react';
import { NumberInput, SelectInput } from 'react-admin';
import { FormatOfWork, Gender } from '@prisma/client';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

const Details = () => {
  const genderChoicesList = getChoicesList(Object.values(Gender));
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork));

  return (
    <FormFieldWrapper
      title={SpecialistCreateFormBlocks.details}
      className="mt-3"
    >
      <div className="flex w-full gap-6">
        <SelectInput
          name={SpecialistFormFields.gender.name}
          source={SpecialistFormFields.gender.name}
          label={SpecialistFormFields.gender.label}
          choices={genderChoicesList}
        />
        <NumberInput
          name={SpecialistFormFields.yearsOfExperience.name}
          source={SpecialistFormFields.yearsOfExperience.name}
          label={SpecialistFormFields.yearsOfExperience.label}
          min="0"
        />
        <SelectInput
          name={SpecialistFormFields.formatOfWork.name}
          source={SpecialistFormFields.formatOfWork.name}
          label={SpecialistFormFields.formatOfWork.label}
          choices={formatOfWorkChoicesList}
          className="flex-1"
        />
      </div>
    </FormFieldWrapper>
  );
};

export { Details };
