import { getSession, signIn, signOut } from 'next-auth/react';
import { LOGIN_URL } from '@/lib/consts';

export const authProvider = {
  login: async credentials =>
    signIn(
      'credentials',
      {
        redirect: false,
        ...credentials,
      },
      credentials,
    ),
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
