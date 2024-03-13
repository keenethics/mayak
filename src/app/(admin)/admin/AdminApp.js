'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate, EventEdit, EventList, EventShow } from '@admin/components/Event';
import { FaqCreate, FaqEdit, FaqList } from '@admin/components/Faq';
import { TherapyCreate, TherapyEdit, TherapyList } from '@admin/components/Therapy';
import {
  OrganizationCreate,
  OrganizationShow,
  OrganizationsList,
  OrganizationEdit,
} from '@admin/components/ServiceProvider/Organization';

import {
  SpecialistCreate,
  SpecialistShow,
  SpecialistsList,
  SpecialistEdit,
} from '@admin/components/ServiceProvider/Specialist';

import { authProvider } from './authProvider';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.organization}
        options={{ label: 'Організації' }}
        list={OrganizationsList}
        show={OrganizationShow}
        create={OrganizationCreate}
        edit={OrganizationEdit}
      />
      <Resource
        name={RESOURCES.specialist}
        options={{ label: 'Спеціалісти' }}
        list={SpecialistsList}
        edit={SpecialistEdit}
        show={SpecialistShow}
        create={SpecialistCreate}
      />
      <Resource
        name={RESOURCES.therapy}
        options={{ label: 'Терапії' }}
        list={TherapyList}
        edit={TherapyEdit}
        create={TherapyCreate}
        show={ShowGuesser}
      />
      <Resource
        name={RESOURCES.event}
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        show={EventShow}
        options={{ label: 'Заходи' }}
      />
      <Resource
        name={RESOURCES.district}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Райони' }}
      />
      <Resource
        name={RESOURCES.specialization}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Спеціалізації' }}
      />
      <Resource
        name={RESOURCES.address}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Адреси' }}
      />
      <Resource name={RESOURCES.event} list={EventList} create={EventCreate} edit={EventEdit} show={EventShow} />
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
        options={{ label: "Зворотній зв'язок" }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
