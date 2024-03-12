import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create, FormDataConsumer, SimpleForm, required, useNotify, useRedirect } from 'react-admin';
import { ActivationForm } from '../ActivationForm';
import { ContactsForm } from '../ContactsForm';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { organizationCreateValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '../../../_lib/consts';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';
import { DescriptionEdit } from '../DescriptionEdit';

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
    <Create
      title={'Додавання нової огранізації'}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      transform={transformOrganizationData}
    >
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
        <FormDataConsumer>
          {({ formData }) => {
            if (!formData) return null;
            const unnecessaryForDraft = formData.isActive && required();
            return (
              <>
                <GeneralInfoEditOrg type="create" validate={unnecessaryForDraft} />
                <DetailsEditOrg validate={unnecessaryForDraft} />
                <AddressesForm label="Адреси надання послуг" />
                <ServicesForm validate={unnecessaryForDraft} label={'Послуги'} />
                <DescriptionEdit validate={required()} />
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
