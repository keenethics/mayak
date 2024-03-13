import { TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecializationsSelect } from './SpecializationsSelect';

export function GeneralInfoEditSpec({ type = FORM_TYPES.create }) {
  return (
    <FormFieldWrapper title="Основна інформація">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInput key="firstName" name="firstName" type="text" label={`Ім'я`} validate={required()} />
        <TextInput key="lastName" name="lastName" type="text" label="Прізвище" validate={required()} />
        <TextInput key="surname" name="surname" type="text" label="По-батькові" />
      </div>
      <SpecializationsSelect type={type} label="Спеціалізації" fullWidth />
    </FormFieldWrapper>
  );
}

GeneralInfoEditSpec.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
