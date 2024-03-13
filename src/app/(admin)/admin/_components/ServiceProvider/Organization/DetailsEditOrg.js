'use client';

import { useWatch } from 'react-hook-form';
import { NumberInput, required } from 'react-admin';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function DetailsEditOrg() {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Деталі" className="mt-3">
      <div className={fieldGroupClass}>
        <NumberInput
          name="yearsOnMarket"
          source="yearsOnMarket"
          label="Років на ринку"
          type="number"
          validate={unnecessaryForDraft}
          min="0"
        />
        <FormatOfWorkSelect label="Формат роботи" validate={unnecessaryForDraft} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}
