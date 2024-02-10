'use client';

import React, { useState } from 'react';
import {
  Create, SimpleForm, useNotify, useRedirect,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessNotifications, Titles } from '@/app/admin/_lib/consts';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as fullSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { General } from '@/app/admin/_components/specialist/create/General';
import { Details } from '@/app/admin/_components/specialist/create/Details';
import { PlacesOfWork } from '@/app/admin/_components/specialist/create/PlacesOfWork';
import { Services } from '@/app/admin/_components/specialist/create/Services';
import { Contacts } from '@/app/admin/_components/specialist/create/Contacts';
import { IsActive } from '@/app/admin/_components/isActive';
import {
  tranformDraftData,
  transformFullData,
} from '@/app/admin/_utils/transformSpecialistFormData';

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(true);

  const notify = useNotify();
  const redirect = useRedirect();

  const validationSchema = draft ? draftSchema : fullSchema;

  const handleSuccess = () => {
    notify(SuccessNotifications.created);
    redirect('/specialist');
  };

  const handleError = (error) => {
    notify(error.message);
  };

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  const transformFormData = (data) => {
    if (draft) {
      return tranformDraftData(data);
    }

    return transformFullData(data);
  };

  return (
    <>
      <Create
        title={Titles.specialistCreate}
        transform={transformFormData}
        mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      >
        <SimpleForm
          mode="onBlur"
          reValidateMode="onChange"
          resolver={zodResolver(validationSchema)}
          className="w-[800px]"
        >
          <General />
          <Details />
          <PlacesOfWork />
          <Services />
          <Contacts />
          <IsActive
            label="Активувати спеціаліста"
            className="mt-8"
            onChange={toggleFormMode}
          />
        </SimpleForm>
      </Create>
    </>
  );
};

export { SpecialistCreate };
