'use client';

import React from 'react';
import { Admin, ListGuesser, Resource, ShowGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { authProvider } from '@/app/admin/authProvider';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { SpecialistCreate } from '@/app/admin/_components/Specialist';
import { ListFaq } from './_components/faq';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.therapy}
        options={{ label: 'Therapy' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name={RESOURCES.specialist}
        options={{ label: 'Specialist' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource name={RESOURCES.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Address" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={RESOURCES.placeOfWork}
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource name={RESOURCES.faq} options={{ label: 'FAQ' }} list={ListFaq} show={ShowGuesser} edit={EditGuesser} />
      <Resource
        name={RESOURCES.feedback}
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
