'use client';

import React from 'react';
import {
  Admin, ListGuesser, Resource, ShowGuesser, EditGuesser,
} from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { authProvider } from './authProvider';
import { SpecialistsList } from '@/app/_components/AdminPage/SpecialistsList';
import { SpecialistShow } from '@/app/_components/AdminPage/SpecialistShow';
import { OrganizationsList } from '@/app/_components/AdminPage/OrganizationsList';
import { OrganizationShow } from '@/app/_components/AdminPage/OrganizationShow';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource name="Therapy" list={ListGuesser} show={ShowGuesser} />
      <Resource
        name="Therapy"
        options={{ label: 'Therapy' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource name="Specialist" list={SpecialistsList} show={SpecialistShow} />
      <Resource name="Organization" list={OrganizationsList} show={OrganizationShow} />
      <Resource name="District" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Specialization" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Address" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name="PlaceOfWork"
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="Feedback"
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
