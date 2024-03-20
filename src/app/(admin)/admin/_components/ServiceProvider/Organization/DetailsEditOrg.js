'use client';

import { useWatch } from 'react-hook-form';
import { NumberInput, required } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { FormatOfWorkSelect } from '@admin/components/ServiceProvider/FormatOfWorkSelect';
import PropTypes from 'prop-types';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function DetailsEditOrg({ className }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Деталі" className={className}>
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

DetailsEditOrg.propTypes = {
  className: PropTypes.string,
};
