'use client';

import React from 'react';
import { Create, FormDataConsumer, SimpleForm, TextInput, required, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { ServicesForm } from '../ServicesForm';
import { AddressesForm } from '../AddressesForm';
import { specialistCreateValidationSchema } from '../../../_lib/validationSchemas/specialistSchema';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistCreate() {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify(SUCCESS_NOTIFICATIONS.created);
    redirect(`/${RESOURCES.specialist}`);
  };

  const handleError = error => {
    notify(error.message);
  };
  //
  return (
    <>
      <Create
        title="Додавання нового спеціаліста"
        transform={transformData}
        mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      >
        <SimpleForm resolver={zodResolver(specialistCreateValidationSchema)}>
          <FormDataConsumer>
            {({ formData }) => {
              if (!formData) return null;
              const unnecessaryForDraft = formData.isActive && required();
              return (
                <>
                  <GeneralInfoEditSpec />
                  <DetailsEditSpec validate={unnecessaryForDraft} />
                  <AddressesForm label="Адреси надання послуг" />
                  <ServicesForm validate={unnecessaryForDraft} label="Послуги" />
                  <TextInput name={'description'} source={'description'} label={'Опис'} fullWidth multiline />
                  <ContactsForm />
                  <ActivationForm label={'Активувати/деактивувати спеціаліста'} />
                </>
              );
            }}
          </FormDataConsumer>
        </SimpleForm>
      </Create>
    </>
  );
}
