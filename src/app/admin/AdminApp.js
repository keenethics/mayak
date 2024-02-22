'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { OrganizationCreate } from '@admin/components/Organization';
import { EventCreate } from '@admin/components/Event';
import { FaqCreate, FaqEdit } from '@admin/components/Faq';
import { authProvider } from '@/app/admin/authProvider';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { SpecialistCreate } from '@/app/admin/_components/Specialist';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource name={RESOURCES.organization} list={ListGuesser} create={OrganizationCreate} />
      <Resource
        name={RESOURCES.specialist}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource name={RESOURCES.event} list={ListGuesser} create={EventCreate} />
      <Resource name={RESOURCES.therapy} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.address} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={RESOURCES.faq}
        options={{ label: 'FAQ' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={FaqEdit}
        create={FaqCreate}
      />
      <Resource
        name={RESOURCES.placeOfWork}
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
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
