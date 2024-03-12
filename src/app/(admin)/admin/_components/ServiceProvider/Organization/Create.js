import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Create,
  FormDataConsumer,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
} from 'react-admin';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { ActivationForm } from '../ActivationForm';
import { ContactsForm } from '../ContactsForm';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';
import { OrganizationTypesSelect } from '../OrganizationTypesSelect';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { organizationCreateValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '../../../_lib/consts';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function OrganizationCreate() {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify(SUCCESS_NOTIFICATIONS.created);
    redirect(`/${RESOURCES.organization}`);
  };

  const handleError = error => {
    notify(error.message);
  };

  return (
    <Create mutationOptions={{ onSuccess: handleSuccess, onError: handleError }} transform={transformOrganizationData}>
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
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
                  <OrganizationTypesSelect fullWidth validate={unnecessaryForDraft} label={'Тип організації'} />
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
                <AddressesForm label="Адреси надання послуг" />
                <ServicesForm validate={unnecessaryForDraft} label={'Послуги'} />
                <TextInput
                  name={'description'}
                  source={'description'}
                  label={'Опис'}
                  validate={required()}
                  fullWidth
                  multiline
                />
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
