import { TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { OrganizationTypesSelect } from './OrganizationTypesSelect';
import { FormFieldWrapper } from '../../FormFieldWrapper';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function GeneralInfoEditOrg({ type = 'create', validate }) {
  return (
    <FormFieldWrapper title={'Основна інформація'}>
      <div className={fieldGroupClass}>
        <TextInput source="name" label="Назва організації" validate={required()} />
      </div>
      <OrganizationTypesSelect label={'Тип організації'} type={type} validate={validate} />
    </FormFieldWrapper>
  );
}

GeneralInfoEditOrg.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']),
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
