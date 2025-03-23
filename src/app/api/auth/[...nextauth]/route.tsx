import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const authOptions: NextAuthOptions = {
  providers: [
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
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        await prisma.users.upsert({
          where: { email: user.email },
          update: {
            full_name: user.name,
            updated_at: new Date(),
          },
          create: {
            email: user.email,
            full_name: user.name,
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        return false;
      }

      return true;
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

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.sub = dbUser.user_id.toString();
          token.email = dbUser.email ?? undefined;
          token.name = dbUser.full_name ?? undefined;
        }
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
