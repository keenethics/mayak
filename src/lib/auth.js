import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { env } from '@/lib/env';
import { LOGIN_URL } from '@/lib/consts';

const adminSessionLifetime = 60 * 60; // 1 hour in seconds

export const { auth, handlers } = NextAuth({
  logger: {
    error: console.error,
  },
  secret: env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: adminSessionLifetime,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const adminCheckResult = z
          .object({
            username: z.string().refine(val => val === env.ADMIN_USERNAME),
            password: z.string().refine(val => val === env.ADMIN_PASSWORD),
          })
          .safeParse(credentials);

        if (!adminCheckResult.success) {
          return null; // returning null throws CredentialSignin error which is logged and then handled internally.
        }

        return { name: adminCheckResult.data.username };
      },
    }),
  ],
  pages: {
    signIn: LOGIN_URL,
  },
  callbacks: {
    async jwt({ user, token }) {
      const newToken = Object.assign(token);
      if (user) {
        newToken.user = { ...token.user, ...user };
      }
      return newToken;
    },
    async session({ session, token }) {
      const newSession = session;
      newSession.user = token.user;
      return newSession;
    },
  },
});
