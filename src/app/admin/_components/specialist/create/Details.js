'use client';

import React from 'react';
import { NumberInput, required, SelectInput } from 'react-admin';
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

  const { gender, yearsOfExperience, formatOfWork } = SpecialistFormFields;

  return (
    <FormFieldWrapper
      title={SpecialistCreateFormBlocks.details}
      className="mt-3"
    >
      <div className="flex w-full gap-6">
        <SelectInput
          name={gender.name}
          source={gender.name}
          label={gender.label}
          validate={gender.validate && required()}
          choices={genderChoicesList}
        />
        <NumberInput
          name={yearsOfExperience.name}
          source={yearsOfExperience.name}
          label={yearsOfExperience.label}
          validate={yearsOfExperience.validate && required()}
          min="0"
        />
        <SelectInput
          name={formatOfWork.name}
          source={formatOfWork.name}
          label={formatOfWork.label}
          choices={formatOfWorkChoicesList}
          validate={formatOfWork.validate && required()}
          className="flex-1"
        />
      </div>
    </FormFieldWrapper>
  );
};

export { Details };
