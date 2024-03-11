import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';
import { FormFieldWrapper } from '../FormFieldWrapper';

export function DescriptionForm({ label }) {
  return (
    <FormFieldWrapper title={label}>
      <TextInput name={'description'} source={'description'} fullWidth multiline />
    </FormFieldWrapper>
  );
}

DescriptionForm.propTypes = {
  label: PropTypes.string,
};
