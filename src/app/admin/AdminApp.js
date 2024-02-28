'use client';

import React from 'react';
import { Admin, ListGuesser, Resource, ShowGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate } from '@admin/components/Event';
import { FaqCreate, FaqEdit, FaqList } from '@admin/components/Faq';
import { SpecialistCreate, SpecialistsList, SpecialistShow } from '@admin/components/Specialist';
import { OrganizationCreate, OrganizationList, OrganizationShow } from '@admin/components/Organization';
import { authProvider } from './authProvider';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.organization}
        list={OrganizationList}
        create={OrganizationCreate}
        show={OrganizationShow}
      />
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
        list={SpecialistsList}
        edit={EditGuesser}
        show={SpecialistShow}
        create={SpecialistCreate}
      />
      <Resource name={RESOURCES.event} list={ListGuesser} create={EventCreate} />
      <Resource name={RESOURCES.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.address} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={RESOURCES.faq}
        options={{ label: 'FAQ' }}
        list={FaqList}
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
