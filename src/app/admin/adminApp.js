"use client";

import { signIn, signOut } from "next-auth/react";
import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  EditGuesser,
} from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

const authProvider = {
  login: async (credentials) => {
    return signIn(credentials);
  },
  logout: () => {
    return signOut();
  },
  checkError: () => Promise.resolve(),
  // checkError: ({ status }) => {
  // if (status === 401 || status === 403) {
  //   localStorage.removeItem("username");
  //   return Promise.reject();
  // }
  // return Promise.resolve();
  // },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => Promise.resolve(),
  // checkAuth: () => {
  // return Promise.resolve();
  // console.log("checkAuth");
  // return localStorage.getItem("username")
  //   ? Promise.resolve()
  //   : Promise.reject();
  // },
  getPermissions: () => Promise.resolve(),
};

export default function AdminPage() {
  // const { data: session } = useSession()
  // console.log("session", session);
  const data = dataProvider("/api/admin");
  return (
    <Admin dataProvider={data} authProvider={authProvider}>
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
