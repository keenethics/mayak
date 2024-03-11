import { OrganizationSchema } from '@admin/_lib/validationSchemas/createOrganizationSchema';
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

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function OrganizationCreate() {
  return (
    <Create transform={transformOrganizationData}>
      <SimpleForm resolver={zodResolver(OrganizationSchema)}>
        <FormDataConsumer>
          {() => (
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
                    label={'Роки на ринку'}
                    validate={required()}
                    min="0"
                  />
                  <FormatOfWorkSelect label={'Формат роботи'} />
                </div>
              </FormFieldWrapper>
              <AddressesForm />
              <ServicesForm label={'Послуги'} />
              <ContactsForm />
              <ActivationForm label={'Активувати/деактивувати організацію'} />
            </>
          )}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
}
