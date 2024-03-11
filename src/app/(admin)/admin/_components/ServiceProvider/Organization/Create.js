import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create, FormDataConsumer, NumberInput, SimpleForm, TextInput, required } from 'react-admin';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { ActivationForm } from '../ActivationForm';
import { ContactsForm } from '../ContactsForm';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';
import { OrganizationTypesSelect } from '../OrganizationTypesSelect';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { organizationCreateValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function OrganizationCreate() {
  return (
    <Create transform={transformOrganizationData}>
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
        <FormDataConsumer>
          {({ formData }) => {
            if (!formData) return null;
            const unnecessaryForDraft = formData.isActive && required();
            return (
              <>
                <FormFieldWrapper title={'General info'}>
                  <div className={fieldGroupClass}>
                    <TextInput source="name" label="Назва організації" validate={required()} />
                  </div>
                  <OrganizationTypesSelect fullWidth validate={required()} label={'Тип організації'} />
                </FormFieldWrapper>

                <FormFieldWrapper title={'Details'} className="mt-3">
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
                <AddressesForm validate={unnecessaryForDraft} />
                <ServicesForm validate={unnecessaryForDraft} label={'Послуги'} />
                <ContactsForm />
                <ActivationForm label={'Активувати/деактивувати організацію'} />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
}
