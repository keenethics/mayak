import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { env } from "@/lib/env";
import { LOGIN_URL } from "./consts";
export const { auth, handlers } = NextAuth({
  logger: {
    error(error) {
      console.log(error);
    }
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600 // 1 hour
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
          const {success, data} = z
          .object({
            username: z.string().refine((val) => val === env.ADMIN_USERNAME),
            password: z.string().refine((val) => val === env.ADMIN_PASSWORD),
          })
          .safeParse(credentials);
        
        if (!success) {
          return null;
        }
        
        return { name: data.username };
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
