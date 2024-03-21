import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { BooleanInput, required, useGetList } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { ServicesFormCreate } from './ServicesFormCreate';
import { ServicesFormEdit } from './ServicesFormEdit';

export function ServicesForm({ label, type = FORM_TYPES.create, className }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();

  return (
    <FormFieldWrapper title={label} className={className}>
      {type === FORM_TYPES.create ? (
        <ServicesFormCreate
          therapiesLoading={therapiesLoading}
          therapiesChoices={therapiesChoices}
          unnecessaryForDraft={unnecessaryForDraft}
        />
      ) : (
        <ServicesFormEdit therapiesChoices={therapiesChoices} unnecessaryForDraft={unnecessaryForDraft} />
      )}
      <BooleanInput
        name="isFreeReception"
        source="isFreeReception"
        label="Безкоштовний прийом"
        className="mt-8 w-full"
        validate={unnecessaryForDraft}
      />
    </FormFieldWrapper>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
