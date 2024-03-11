import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, required, FormDataConsumer, NumberInput } from 'react-admin';
import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { specialistEditValidationSchema } from '../../../_lib/validationSchemas/specialistSchema';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { GeneralInfoEdit } from '../GeneralInfoEdit';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { GenderSelect } from '../GenderSelect';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';
import { transformSpecialistEditData } from '../../../_utils/transformSpecialistEditData';

export function SpecialistEdit() {
  return (
    <Edit title={'Редагувати дані спеціаліста'} transform={transformSpecialistEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        <FormDataConsumer>
          {({ formData }) => {
            if (!formData) return null;
            const unnecessaryForDraft = formData.isActive && required();
            return (
              <>
                <GeneralInfoEdit type="edit" />
                <FormFieldWrapper title={'Details'} className="mt-3">
                  <div className={'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow'}>
                    <GenderSelect label={'Стать'} validate={unnecessaryForDraft} />
                    <NumberInput
                      name={'yearsOfExperience'}
                      source={'yearsOfExperience'}
                      label={'Роки досвіду'}
                      validate={unnecessaryForDraft}
                      min="0"
                    />
                    <FormatOfWorkSelect label={'Формат роботи'} validate={unnecessaryForDraft} className="flex-1" />
                  </div>
                </FormFieldWrapper>
                <AddressesForm validate={unnecessaryForDraft} type="edit" label="Адреси надання послуг" />
                <ServicesForm type="edit" validate={unnecessaryForDraft} label="Послуги" />
                <ContactsForm />
                <ActivationForm label={'Активувати/деактивувати спеціаліста'} />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
}
