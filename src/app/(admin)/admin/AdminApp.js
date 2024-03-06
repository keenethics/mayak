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
      <Resource
        name={RESOURCES.placeOfWork}
        options={{ label: 'Місця надання послуг' }}
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
        options={{ label: "Зворотній зв'язок" }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}