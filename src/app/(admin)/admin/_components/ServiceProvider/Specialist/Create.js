'use client';

import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { specialistCreateValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { ClientCategoriesCreateForm } from '@admin/components/ServiceProvider/ClientCategoriesCreateForm';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.specialist}`,
  });
  return (
    <Create
      resolver={zodResolver(specialistCreateValidationSchema)}
      title="Додавання нового спеціаліста"
      transform={transformData}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <SimpleForm>
        <GeneralInfoEditSpec />
        <DetailsEditSpec />
        <AddressesForm label="Адреси надання послуг" />
        <ClientCategoriesCreateForm label="Категорії клієнтів" />
        <ServicesForm label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати спеціаліста" />
      </SimpleForm>
    </Create>
  );
}
