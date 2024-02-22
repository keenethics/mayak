'use client';

import React from 'react';
import { Admin, ListGuesser, Resource, ShowGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate, EventList, EventShow } from '@admin/components/Event';
import { FaqCreate, FaqEdit } from '@admin/components/Faq';
import { SpecialistCreate } from '@admin/components/Specialist';
import { authProvider } from './authProvider';

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
      <Resource name={RESOURCES.event} list={EventList} create={EventCreate} show={EventShow} />
      <Resource name={RESOURCES.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.address} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={RESOURCES.placeOfWork}
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name={RESOURCES.faq}
        options={{ label: 'FAQ' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={FaqEdit}
        create={FaqCreate}
      />
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
