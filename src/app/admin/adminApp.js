'use client';

import React from 'react';
import {
  Admin, EditGuesser, ListGuesser, Resource, ShowGuesser,
} from 'react-admin';
import { SpecialistCreate } from '@/app/admin/_components/specialist';
import { authProvider, dataProvider } from '@/app/admin/_providers';
import { Resources } from '@/app/admin/_lib/consts';

export default function AdminPage() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name={Resources.therapy}
        options={{ label: 'Therapy' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name={Resources.specialist}
        options={{ label: 'Specialist' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource name={Resources.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={Resources.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Address" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={Resources.placeOfWork}
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name={Resources.feedback}
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
