'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { authProvider } from '@/app/admin/authProvider';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { SpecialistCreate } from '@/app/admin/_components/Specialist';
import { CreateOrganization } from '@admin/components/Organization';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.organization}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={CreateOrganization}
      />
      <Resource
        name={RESOURCES.specialist}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource name={RESOURCES.therapy} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
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
        name={RESOURCES.feedback}
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
