import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { AutocompleteArrayInput, BooleanInput, ReferenceArrayInput, required } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { FORM_TYPES } from '@admin/_lib/consts';
import { TherapiesCutsSelect } from './TherapiesCutsSelect';

export function ServicesForm({ label, type = FORM_TYPES.create }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();

  return (
    <FormFieldWrapper title={label}>
      {type === FORM_TYPES.create ? (
        <TherapiesCutsSelect />
      ) : (
        <ReferenceArrayInput source="therapiesIds" reference="Therapy">
          <AutocompleteArrayInput label="Терапії" optionValue="id" optionText="title" validate={unnecessaryForDraft} />
        </ReferenceArrayInput>
      )}
      <BooleanInput
        name="isFreeReception"
        source="isFreeReception"
        label="Безкоштовний прийом"
        className="w-full"
        validate={unnecessaryForDraft}
      />
    </FormFieldWrapper>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
