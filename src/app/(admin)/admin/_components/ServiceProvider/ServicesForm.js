import PropTypes from 'prop-types';
import { BooleanInput, SelectArrayInput, TextInput, required, useGetList } from 'react-admin';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { RESOURCES } from '../../_lib/consts';

export function ServicesForm({ label }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));

  return (
    <FormFieldWrapper title={label}>
      <SelectArrayInput
        name={'therapies'}
        source={'therapies'}
        label={'Терапії'}
        isLoading={therapiesLoading}
        choices={therapiesChoices}
        validate={required()}
        className="w-full"
      />
      <BooleanInput
        name={'isFreeReception'}
        source={'isFreeReception'}
        label={'Безкоштовний прийом'}
        className="w-max"
      />
      <TextInput name={'description'} source={'description'} label={'Опис'} fullWidth multiline />
    </FormFieldWrapper>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
};
