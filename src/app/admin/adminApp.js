'use client';

import React from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import {
  Admin, ListGuesser, Resource, ShowGuesser, EditGuesser,
} from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { LOGIN_URL } from '@/lib/consts';

const authProvider = {
  login: async (credentials) => {
    signIn('credentials', credentials, { redirect: false });
  },
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
      <Resource name="Therapy" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Specialist" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
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
    </Admin>
  );
}
