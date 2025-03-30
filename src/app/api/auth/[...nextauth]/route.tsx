import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isValid) return null;

        return {
          id: user.user_id,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false;
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.users.findUnique({
            where: { email: user.email! },
          });

          if (existingUser && !existingUser.google_id) {
            await prisma.users.update({
              where: { email: user.email! },
              data: { google_id: account.providerAccountId },
            });
          } else if (!existingUser) {
            await prisma.users.create({
              data: {
                email: user.email,
                full_name: user.name,
                google_id: account.providerAccountId,
              },
            });
          }
        } catch (error) {
          console.error("Database error:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      console.log(`jwk user: ${user}`);
      if (user?.email) {
        const dbUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.sub = dbUser.user_id;
          token.email = dbUser.email;
          token.name = dbUser.full_name;
        }
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
