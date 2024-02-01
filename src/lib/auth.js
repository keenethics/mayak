import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { env } from './env';


export const { auth, handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { success, username, password } = z
          .object({
            username: z.string().refine(val => val === env.ADMIN_USERNAME),
            password: z.string().refine(val => val === env.ADMIN_PASSWORD),
          })
          .safeParse(credentials);

        if (!success) {
          return null;
        }

        return { username, password };
      },
    }),
  ],
});
