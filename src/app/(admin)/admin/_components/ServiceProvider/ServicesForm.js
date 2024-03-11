import PropTypes from 'prop-types';
import {
  AutocompleteArrayInput,
  BooleanInput,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
  useGetList,
} from 'react-admin';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { RESOURCES } from '../../_lib/consts';

export function ServicesForm({ label, validate, type = 'create' }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));

  return (
    <FormFieldWrapper title={label}>
      {type === 'create' && (
        <SelectArrayInput
          name={'therapies'}
          source={'therapies'}
          label={'Терапії'}
          isLoading={therapiesLoading}
          choices={therapiesChoices}
          validate={validate}
          className="w-full"
        />
      )}
      {type === 'edit' && (
        <ReferenceArrayInput source="therapiesIds" reference="Therapy">
          <AutocompleteArrayInput optionValue="id" optionText="title" />
        </ReferenceArrayInput>
      )}
      <BooleanInput
        name={'isFreeReception'}
        source={'isFreeReception'}
        label={'Безкоштовний прийом'}
        className="w-max"
        validate={validate}
      />
      <TextInput name={'description'} source={'description'} label={'Опис'} validate={validate} fullWidth multiline />
    </FormFieldWrapper>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['create', 'edit']),
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
