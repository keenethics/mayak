'use client';

import { TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { OrganizationTypesSelect } from './OrganizationTypesSelect';
import { FormFieldWrapper } from '../../FormFieldWrapper';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function GeneralInfoEditOrg({ type = 'create' }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Основна інформація">
      <div className={fieldGroupClass}>
        <TextInput source="name" label="Назва організації" validate={required()} />
      </div>
      <OrganizationTypesSelect label="Тип організації" type={type} validate={unnecessaryForDraft} />
    </FormFieldWrapper>
  );
}

GeneralInfoEditOrg.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']),
};
