"use client";

import { LOGIN_URL } from "@/lib/consts";
import { getSession, signIn, signOut, } from "next-auth/react";
import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  EditGuesser,
} from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

const authProvider = ({ signIn, signOut }) => ({
    login: async (credentials) => {
      await signIn(credentials);
      return Promise.resolve();
    },
    logout: async () => {
      await signOut();
      return Promise.resolve();
    },
    checkAuth: async () => {
      const session = await getSession();
      if (session === null) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    checkError:  (error) => Promise.resolve(),
    getIdentity: async () => {
      const session = await getSession();
      return Promise.resolve({
        id: session.user.id,
        fullName: session.user.name,
    })},
    getPermissions: () => Promise.resolve(''),
});

export default function AdminPage() {
  const data = dataProvider("/api/admin");
  const auth = authProvider({
    signIn: (credentials) => 
      signIn("credentials", credentials, { redirect: false }),
    signOut: () => 
      signOut({callbackUrl: LOGIN_URL}),
  })
  return (
    <Admin dataProvider={data} authProvider={auth}>
      <Resource
        name="Therapy"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="Specialist"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
}
