import { zodResolver } from '@hookform/resolvers/zod';
import { organizationEditValidationSchema } from '../../../_lib/validationSchemas/organizationSchema';

import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { AddressesForm } from '../AddressesForm';
import { ServicesForm } from '../ServicesForm';
import { transformOrganizationEditData } from '../../../_utils/transformOrganizationEditData';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';
import { DescriptionEdit } from '../DescriptionEdit';

const { Edit, SimpleForm, required, FormDataConsumer } = require('react-admin');

export function OrganizationEdit() {
  return (
    <Edit title={'Редагування данних організації'} transform={transformOrganizationEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        <FormDataConsumer>
          {({ formData }) => {
            if (!formData) return null;
            const unnecessaryForDraft = formData.isActive && required();
            return (
              <>
                <GeneralInfoEditOrg type="edit" validate={unnecessaryForDraft} />
                <DetailsEditOrg validate={unnecessaryForDraft} />
                <AddressesForm label="Адреси надання послуг" type="edit" />
                <ServicesForm type="edit" validate={unnecessaryForDraft} label={'Послуги'} />
                <DescriptionEdit validate={required()} />
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
