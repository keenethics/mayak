'use client';

import React from 'react';
import { BooleanInput, Create, SimpleForm, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactsList } from '@admin/_components';
import { General } from '@admin/components/Specialist/General';
import { Details } from '@admin/components/Specialist/Details';
import { Addresses } from '@admin/components/Specialist/Addresses';
import { Services } from '@admin/components/Specialist/Services';
import { SocialLinks } from '@admin/components/Specialist/SocialLinks';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { specialistValidationSchema } from '@/lib/validationSchemas/specialistSchema';

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

  return (
    <>
      <Create
        title="Додавання нового спеціаліста"
        transform={transformData}
        mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      >
        <SimpleForm resolver={zodResolver(specialistValidationSchema)}>
          <General />
          <Details />
          <Addresses />
          <Services />
          <ContactsList />
          <SocialLinks />
          <BooleanInput name="isActive" source="isActive" label="Активувати спеціаліста" className="mt-8" />
        </SimpleForm>
      </Create>
    </>
  );
}
