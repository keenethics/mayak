'use client';

import { useWatch } from 'react-hook-form';
import { NumberInput, required } from 'react-admin';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { GenderSelect } from '../GenderSelect';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';

export function DetailsEditSpec() {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Деталі" className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <GenderSelect label="Стать" validate={unnecessaryForDraft} />
        <NumberInput name="yearsOfExperience" source="yearsOfExperience" label="Роки стажу" min="0" />
        <FormatOfWorkSelect label="Формат роботи" validate={unnecessaryForDraft} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}
