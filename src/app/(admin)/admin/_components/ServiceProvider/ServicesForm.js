import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  AutocompleteArrayInput,
  BooleanInput,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  useGetList,
} from 'react-admin';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { FORM_TYPES, RESOURCES } from '../../_lib/consts';

export function ServicesForm({ label, type = FORM_TYPES.create }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));

  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();

  return (
    <FormFieldWrapper title={label}>
      {type === FORM_TYPES.create ? (
        <SelectArrayInput
          name="therapies"
          source="therapies"
          label="Терапії"
          isLoading={therapiesLoading}
          choices={therapiesChoices}
          validate={unnecessaryForDraft}
          className="w-full"
        />
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
