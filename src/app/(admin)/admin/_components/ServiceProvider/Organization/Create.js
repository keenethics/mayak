import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create, SimpleForm, required } from 'react-admin';
import { organizationCreateValidationSchema } from '@admin/_lib/validationSchemas/organizationSchema';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import {
  ContactsForm,
  ActivationForm,
  ServicesForm,
  AddressesForm,
  DescriptionEdit,
} from '@admin/components/ServiceProvider';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';

export function OrganizationCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.organization}`,
  });

  return (
    <Create
      title="Додавання нової огранізації"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      transform={transformOrganizationData}
    >
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
        <GeneralInfoEditOrg type="create" />
        <DetailsEditOrg />
        <AddressesForm label="Адреси надання послуг" />
        <ServicesForm label="Послуги" />
        <DescriptionEdit validate={required()} />
        <ContactsForm />
        <ActivationForm label="Активувати/деактивувати організацію" className="mt-3" />
      </SimpleForm>
    </Create>
  );
}
