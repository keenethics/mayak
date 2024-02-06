'use client';

import React from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import {
  Admin, ListGuesser, Resource, ShowGuesser,
} from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { LOGIN_URL } from '@/lib/consts';
import AdminSpecialistList from '@/app/_components/AdminSpecialistsList';
import AdminSpecialistShow from '@/app/_components/AdminSpecialistShow';
import AdminOrganizationsList from '@/app/_components/AdminOrganizationsList';
import AdminOrganizationShow from '@/app/_components/AdminOrganizationShow';

const authProvider = {
  login: async credentials => signIn('credentials', credentials, { redirect: false }),
  logout: async () => signOut({ callbackUrl: LOGIN_URL }),
  checkAuth: async () => {
    const session = await getSession();
    return session ? Promise.resolve() : Promise.reject();
  },
  checkError: async () => {
    Promise.resolve();
  },
  getIdentity: async () => {
    const session = await getSession();

    return {
      id: session.user.id,
      fullName: session.user.name,
    };
  },
  getPermissions: () => Promise.resolve(),
};

export default function AdminPage() {
  const data = dataProvider('/api/admin');
  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource name="Therapy" list={ListGuesser} show={ShowGuesser} />
      <Resource
        name="Specialist"
        list={AdminSpecialistList}
        show={AdminSpecialistShow}
      />
      <Resource
        name="Organizations"
        list={AdminOrganizationsList}
        show={AdminOrganizationShow}
      />
    </Admin>
  );
}
