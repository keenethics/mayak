'use client';

import React from 'react';
import { BooleanInput, Create, SimpleForm, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { General } from '@admin/components/Specialist/General';
import { Details } from '@admin/components/Specialist/Details';
import { PlacesOfWork } from '@admin/components/Specialist/PlacesOfWork';
import { Services } from '@admin/components/Specialist/Services';
import { Contacts } from '@admin/components/Specialist/Contacts';
import { DaysOfWork } from '@admin/components/Specialist/DaysOfWork';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@/app/admin/_lib/consts';
import { specialistValidationSchema } from '@/lib/validationSchemas/specialistSchema';
import { transformData } from '@/app/admin/_utils/transformSpecialistFormData';

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
          <PlacesOfWork />
          <Services />
          <Contacts />
          <DaysOfWork />
          <BooleanInput name="isActive" source="isActive" label="Активувати спеціаліста" className="mt-8" />
        </SimpleForm>
      </Create>
    </>
  );
}
