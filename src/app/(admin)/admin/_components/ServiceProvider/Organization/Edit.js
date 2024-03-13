import { zodResolver } from '@hookform/resolvers/zod';
import { organizationEditValidationSchema } from '@admin/_lib/validationSchemas/organizationSchema';
import { transformOrganizationEditData } from '@admin/_utils/transformOrganizationEditData';
import {
  ContactsForm,
  ActivationForm,
  ServicesForm,
  AddressesForm,
  DescriptionEdit,
} from '@admin/components/ServiceProvider';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';

const { Edit, SimpleForm, required } = require('react-admin');

export function OrganizationEdit() {
  return (
    <Edit title="Редагування данних організації" transform={transformOrganizationEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        <GeneralInfoEditOrg type="edit" />
        <DetailsEditOrg />
        <AddressesForm label="Адреси надання послуг" type="edit" />
        <ServicesForm type="edit" label="Послуги" />
        <DescriptionEdit validate={required()} />
        <ContactsForm />
        <ActivationForm label="Активувати/деактивувати організацію" className="mt-3" />
      </SimpleForm>
    </Edit>
  );
}
