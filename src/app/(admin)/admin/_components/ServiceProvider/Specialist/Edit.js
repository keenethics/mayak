import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { specialistEditValidationSchema } from '../../../_lib/validationSchemas/specialistSchema';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';
import { transformSpecialistEditData } from '../../../_utils/transformSpecialistEditData';

export function SpecialistEdit() {
  return (
    <Edit title={'Редагувати дані спеціаліста'} transform={transformSpecialistEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        <GeneralInfoEditSpec type="edit" />
        <DetailsEditSpec />
        <AddressesForm type="edit" label="Адреси надання послуг" />
        <ServicesForm type="edit" label="Послуги" />
        <TextInput name={'description'} source={'description'} label={'Опис'} fullWidth multiline />
        <ContactsForm />
        <ActivationForm label={'Активувати/деактивувати спеціаліста'} className="mt-3" />
      </SimpleForm>
    </Edit>
  );
}
