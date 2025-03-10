import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
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
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: { params: { scope: "r_liteprofile r_emailaddress" } },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false; // Ensure email exists

      try {
        const existingUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Only update if `full_name` has changed
          if (existingUser.full_name !== user.name) {
            await prisma.users.update({
              where: { email: user.email },
              data: { full_name: user.name, updated_at: new Date() },
            });
          }
        } else {
          // Create a new user if they don’t exist
          await prisma.users.create({
            data: {
              email: user.email,
              full_name: user.name,
            },
          });
        }
      } catch (error) {
        console.error("Database error:", error);
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure user ID is saved
        token.email = user.email;
        token.name = user.name;
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
