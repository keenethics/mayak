'use client';

import React, { useState } from 'react';
import {
  BooleanInput,
  Create,
  SimpleForm,
  useNotify,
  useRedirect,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessNotifications, Titles } from '@/app/admin/_lib/consts';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as fullSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { General } from '@/app/admin/_components/specialist/Create/General';
import { Details } from '@/app/admin/_components/specialist/Create/Details';
import { PlacesOfWork } from '@/app/admin/_components/specialist/Create/PlacesOfWork';
import { Services } from '@/app/admin/_components/specialist/Create/Services';
import { Contacts } from '@/app/admin/_components/specialist/Create/Contacts';
import { transformIdList } from '@/app/admin/_utils/transformIdList';

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(true);

  const notify = useNotify();
  const redirect = useRedirect();

  const validationSchema = draft ? draftSchema : fullSchema;

  const handleSuccess = () => {
    notify(SuccessNotifications.created);
    redirect('/Specialist');
  };

  const handleError = (error) => {
    notify(error.message);
  };

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  const transformPlacesOfWork = (placesArray) => {
    const mappedPlaces = placesArray.map(place => ({
      ...place,
      district: { connect: { id: place.district } },
    }));

    return [
      {
        addresses: {
          create: mappedPlaces,
        },
      },
    ];
  };

  const transformFormData = (data) => {
    if (draft) {
      return {
        ...data,
        specializations: {
          connect: transformIdList(data.specializations),
        },
      };
    }

    return {
      ...data,
      specializations: {
        connect: transformIdList(data.specializations),
      },
      placesOfWork: {
        create: transformPlacesOfWork(data.placesOfWork),
      },
      therapies: {
        connect: transformIdList(data.therapies),
      },
    };
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
          <BooleanInput
            name="isActive"
            source="isActive"
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
