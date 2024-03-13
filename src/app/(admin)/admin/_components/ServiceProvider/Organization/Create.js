import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create, SimpleForm, required } from 'react-admin';
import { ActivationForm } from '../ActivationForm';
import { ContactsForm } from '../ContactsForm';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { organizationCreateValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '../../../_lib/consts';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';
import { DescriptionEdit } from '../DescriptionEdit';
import { useRedirectToList } from '../hooks/useRedirectToList';

export function OrganizationCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.organization}`,
  });

  return (
    <Create
      title={'Додавання нової огранізації'}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      transform={transformOrganizationData}
    >
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
        <GeneralInfoEditOrg type="create" />
        <DetailsEditOrg />
        <AddressesForm label="Адреси надання послуг" />
        <ServicesForm label={'Послуги'} />
        <DescriptionEdit validate={required()} />
        <ContactsForm />
        <ActivationForm label={'Активувати/деактивувати організацію'} className="mt-3" />
      </SimpleForm>
    </Create>
  );
}
