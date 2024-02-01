import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { env } from "@/lib/env";
import { LOGIN_URL } from "./consts";

const adminSessionLifetime = 60 * 60; // 1 hour in seconds

export const { auth, handlers } = NextAuth({
  logger: {
    error: console.error
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: adminSessionLifetime
  },
  events: {
    signOut ({token}) {
      console.log(`User ${token.name} has signed out`);
    },
    signIn ({user}) {
      console.log(`User ${user.name} has signed in`);
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
          const adminCheckResult = z
          .object({
            username: z.string().refine((val) => val === env.ADMIN_USERNAME),
            password: z.string().refine((val) => val === env.ADMIN_PASSWORD),
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
    async jwt({user, token}) {
      if (user) {
        token.user = {...token.user, ...user};
      }
      return token; 
    },
    async session({session, token}) {
      session.user = token.user;
      return session;
    },
  },
});
