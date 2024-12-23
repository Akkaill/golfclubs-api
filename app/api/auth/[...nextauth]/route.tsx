import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../../lib/db";
import bcrypt from "bcrypt";


export const authOptions= {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "gc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existtingUserEmail = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existtingUserEmail) {
          return null;
        }
        if (
          existtingUserEmail &&
          (await bcrypt.compare(
            credentials.password,
            existtingUserEmail.password
          ))
        ) {
          return {
            id: existtingUserEmail.id,
            name: existtingUserEmail.name,
            email: existtingUserEmail.email,
            role: existtingUserEmail.role,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
   async jwt ({ token, user }) {
  if(user){
    
     token.id=user.id
     token.role=user.role
 
  }
  return token
    },
   async session ({ session, token })  {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          role: token.role,
        },
      
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
