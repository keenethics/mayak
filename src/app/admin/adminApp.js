'use client';

import React from 'react';
import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from 'react-admin';
import { authProvider, dataProvider } from '@/app/admin/_providers';
import SpecialistCreate from '@/app/admin/_components/SpecialistCreate';

export default function AdminPage() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="therapy"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="specialist"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource
        name="District"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="Specialization"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="Address"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="PlaceOfWork"
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
}
