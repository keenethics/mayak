import { AutocompleteArrayInput, ReferenceArrayInput, TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { SpecializationsSelect } from './SpecializationsSelect';

export function GeneralInfoEdit({ type = 'create' }) {
  return (
    <FormFieldWrapper title={'General info'}>
      <div className={'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow'}>
        <TextInput key={'firstName'} name={'firstName'} type={'text'} label={"Ім'я"} validate={required()} />
        <TextInput key={'lastName'} name={'lastName'} type={'text'} label={'Last Name'} validate={required()} />
        <TextInput key={'surname'} name={'surname'} type={'text'} label={'SUname'} />
      </div>
      {type === 'create' && <SpecializationsSelect label={'Спеціалізації'} fullWidth validate={required()} />}
      {type === 'edit' && (
        <ReferenceArrayInput source={'specializationsIds'} reference="Specialization">
          <AutocompleteArrayInput optionValue="id" optionText="name" />
        </ReferenceArrayInput>
      )}
    </FormFieldWrapper>
  );
}

GeneralInfoEdit.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']),
};
