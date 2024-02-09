'use client';

import React, { useState } from 'react';
import {
  Create, SimpleForm, useNotify, useRedirect,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormMode,
  SuccessNotifications,
  Titles,
} from '@/app/admin/_lib/consts';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as baseSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { Toggle } from '@/app/admin/_components/shared/Toggle';
import { transformIdList } from '@/app/admin/_utils/transformIdList';
import { SpecialistCreateGeneral } from '@/app/admin/_components/specialist/SpecialistCreate/SpecialistCreateGeneral';
import { SpecialistCreateDetails } from '@/app/admin/_components/specialist/SpecialistCreate/SpecialistCreateDetails';
import { SpecialistCreatePlacesOfWork } from '@/app/admin/_components/specialist/SpecialistCreate/SpecialistCreatePlacesOfWork';
import { SpecialistCreateServices } from '@/app/admin/_components/specialist/SpecialistCreate/SpecialistCreateServices';
import { SpecialistCreateContacts } from '@/app/admin/_components/specialist/SpecialistCreate/SpecialistCreateContacts';

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();

  const formMode = draft ? FormMode.draft : FormMode.base;
  const validationSchema = draft ? draftSchema : baseSchema;

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
    const mappedPlaces = placesArray.map((place) => {
      // eslint-disable-next-line no-param-reassign
      place.district = {
        connect: { id: place.district },
      };
      return place;
    });

    return [
      {
        addresses: {
          create: mappedPlaces.slice(),
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
      <Toggle onChange={toggleFormMode} caption={formMode} />
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
          <SpecialistCreateGeneral />
          {!draft && (
            <>
              <SpecialistCreateDetails />
              <SpecialistCreatePlacesOfWork />
              <SpecialistCreateServices />
              <SpecialistCreateContacts />
            </>
          )}
        </SimpleForm>
      </Create>
    </>
  );
};

export { SpecialistCreate };
