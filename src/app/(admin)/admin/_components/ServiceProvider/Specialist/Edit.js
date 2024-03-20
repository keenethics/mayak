import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { specialistEditValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { transformSpecialistEditData } from '@admin/_utils/transformSpecialistEditData';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistEdit() {
  return (
    <Edit title="Редагувати дані спеціаліста" transform={transformSpecialistEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        <GeneralInfoEditSpec type="edit" />
        <DetailsEditSpec />
        <AddressesForm type="edit" label="Адреси надання послуг" />
        <ServicesForm label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати спеціаліста" />
      </SimpleForm>
    </Edit>
  );
}
