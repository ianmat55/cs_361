import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Redirect users to the login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
