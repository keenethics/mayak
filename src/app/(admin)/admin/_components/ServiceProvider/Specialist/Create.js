'use client';

import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { specialistCreateValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { ContactsForm, ActivationForm, ServicesForm, AddressesForm } from '@admin/components/ServiceProvider';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.specialist}`,
  });

  return (
    <Create
      title="Додавання нового спеціаліста"
      transform={transformData}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <SimpleForm resolver={zodResolver(specialistCreateValidationSchema)}>
        <GeneralInfoEditSpec />
        <DetailsEditSpec />
        <AddressesForm label="Адреси надання послуг" />
        <ServicesForm label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsForm />
        <ActivationForm label="Активувати/деактивувати спеціаліста" className="mt-3" />
      </SimpleForm>
    </Create>
  );
}
