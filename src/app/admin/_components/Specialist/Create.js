'use client';

import React from 'react';
import { BooleanInput, Create, SimpleForm, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { specialistValidationSchema } from '@/lib/validationSchemas/specialistSchema';
import { General } from '@/app/admin/_components/Specialist/Create/General';
import { Details } from '@/app/admin/_components/Specialist/Create/Details';
import { PlacesOfWork } from '@/app/admin/_components/Specialist/Create/PlacesOfWork';
import { Services } from '@/app/admin/_components/Specialist/Create/Services';
import { Contacts } from '@/app/admin/_components/Specialist/Create/Contacts';
import { DaysOfWork } from '@/app/admin/_components/Specialist/Create/DaysOfWork';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@/app/admin/_lib/consts';
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
        <SimpleForm
          // mode="onBlur"
          // reValidateMode="onChange"
          resolver={zodResolver(specialistValidationSchema)}
        >
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
