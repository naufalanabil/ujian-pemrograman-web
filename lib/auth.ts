import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import prisma from "./db";
import {
  sendVerificationRequest,
  createVerificationToken,
  generateVerificationToken,
} from "./mail";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, //2 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { email: token.email ?? "" },
      });

      if (user && !user.emailVerified) {
        throw new Error("Email not verified");
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          name: token.name,
          image: token.picture || user?.profileImgUrl || null,
        },
      };
    },
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { email: token.email ?? "" },
      });

      if (!existingUser) return token;

      if (
        trigger === "update" &&
        existingUser.name !== session.name &&
        existingUser.profileImgUrl !== session.profileImgUrl
      ) {
        token.name = session.name;
        token.picture = session.profileImgUrl;
      }

      token.id = existingUser.id;
      token.role = existingUser.role;

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          name: token.name,
          profileImgUrl: token.picture || existingUser.profileImgUrl,
        },
      });

      return token;
    },
  },
  adapter: {
    ...PrismaAdapter(prisma),
    createVerificationToken,
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
      generateVerificationToken,
      maxAge: 60,
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin/error",
  },
};

export default authOptions;
