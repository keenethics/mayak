'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate, EventEdit, EventList, EventShow } from '@admin/components/Event';
import { FaqCreate, FaqEdit, FaqList } from '@admin/components/Faq';
import { SpecialistCreate, SpecialistShow, SpecialistsList } from '@admin/components/Specialist';
import { OrganizationCreate, OrganizationShow, OrganizationsList } from '@admin/components/Organization';
import { CreateTherapy, EditTherapy, ListTherapy } from '@admin/components/Therapy';
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
      />
      <Resource
        name={RESOURCES.specialist}
        options={{ label: 'Спеціалісти' }}
        list={SpecialistsList}
        edit={EditGuesser}
        show={SpecialistShow}
        create={SpecialistCreate}
      />
      <Resource
        name={RESOURCES.therapy}
        options={{ label: 'Терапії' }}
        list={ListTherapy}
        edit={EditTherapy}
        create={CreateTherapy}
        show={ShowGuesser}
      />
      <Resource name={RESOURCES.event} list={EventList} create={EventCreate} edit={EventEdit} show={EventShow} />
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
