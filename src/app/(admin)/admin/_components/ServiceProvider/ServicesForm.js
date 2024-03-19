import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { BooleanInput, required } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { TherapiesCutsSelect } from './TherapiesCutsSelect';

export function ServicesForm({ label }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();

  return (
    <FormFieldWrapper title={label}>
      <TherapiesCutsSelect />
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
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
