'use client';

import React from 'react';
import { NumberInput, required, SelectInput } from 'react-admin';
import { FormatOfWork, Gender } from '@prisma/client';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormBlocks, SpecialistFormFields } from '@/app/admin/_lib/specialistData';

export function Details() {
  const getChoicesList = list => list.map(item => ({
    id: item,
    name: item.toLowerCase(),
  }));

  const genderChoicesList = getChoicesList(Object.values(Gender));
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork));

  const { gender, yearsOfExperience, formatOfWork } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormBlocks.details} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
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
}
