'use client';

import React, { useState } from 'react';
import { BooleanInput, Create, SimpleForm, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as fullSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { General } from '@/app/admin/_components/specialist/create/General';
import { Details } from '@/app/admin/_components/specialist/create/Details';
import { PlacesOfWork } from '@/app/admin/_components/specialist/create/PlacesOfWork';
import { Services } from '@/app/admin/_components/specialist/create/Services';
import { Contacts } from '@/app/admin/_components/specialist/create/Contacts';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@/app/admin/_lib/consts';
import { transformData } from '@/app/admin/_utils/transformSpecialistFormData';

export function SpecialistCreate() {
  const [draft, setDraft] = useState(true);

  const notify = useNotify();
  const redirect = useRedirect();

  const validationSchema = draft ? draftSchema : fullSchema;

  const handleSuccess = () => {
    notify(SUCCESS_NOTIFICATIONS.created);
    redirect(`/${RESOURCES.specialist}`);
  };

  const handleError = error => {
    notify(error.message);
  };

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  return (
    <>
      <Create
        title="Додавання нового спеціаліста"
        transform={transformData}
        mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      >
        <SimpleForm
          mode="onBlur"
          reValidateMode="onChange"
          resolver={zodResolver(validationSchema)}
          className="max-w-[800px]"
          // sanitizeEmptyValues={true}
        >
          <General />
          <Details />
          <PlacesOfWork />
          <Services />
          <Contacts />
          <BooleanInput
            name="isActive"
            source="isActive"
            label="Активувати спеціаліста"
            onChange={toggleFormMode}
            className="mt-8"
          />
        </SimpleForm>
      </Create>
    </>
  );
}
