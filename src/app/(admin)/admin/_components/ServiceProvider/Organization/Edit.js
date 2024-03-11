import { zodResolver } from '@hookform/resolvers/zod';
import { organizationEditValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';

import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { OrganizationTypesSelect } from '../OrganizationTypesSelect';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';
import { AddressesForm } from '../AddressesForm';
import { ServicesForm } from '../ServicesForm';
import { transformOrganizationEditData } from '../../../_utils/transformOrganizationEditData';

const { Edit, SimpleForm, TextInput, required, FormDataConsumer, NumberInput } = require('react-admin');

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function OrganizationEdit() {
  return (
    <Edit title={'Редагувати дані організації'} transform={transformOrganizationEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        <FormDataConsumer>
          {({ formData }) => {
            if (!formData) return null;
            const unnecessaryForDraft = formData.isActive && required();
            return (
              <>
                <FormFieldWrapper title={'Основна інформація'}>
                  <div className={fieldGroupClass}>
                    <TextInput source="name" label="Назва організації" validate={required()} />
                  </div>
                  <OrganizationTypesSelect type="edit" fullWidth validate={required()} label={'Тип організації'} />
                </FormFieldWrapper>

                <FormFieldWrapper title={'Деталі'} className="mt-3">
                  <div className={fieldGroupClass}>
                    <NumberInput
                      name={'yearsOnMarket'}
                      source={'yearsOnMarket'}
                      label={'Років на ринку'}
                      validate={unnecessaryForDraft}
                      min="0"
                    />
                    <FormatOfWorkSelect label={'Формат роботи'} validate={unnecessaryForDraft} className="flex-1" />
                  </div>
                </FormFieldWrapper>
                <AddressesForm label="Адреси" type="edit" validate={unnecessaryForDraft} />
                <ServicesForm type="edit" validate={unnecessaryForDraft} label={'Послуги'} />
                <ContactsForm />
                <ActivationForm label={'Активувати/деактивувати організацію'} />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
}
