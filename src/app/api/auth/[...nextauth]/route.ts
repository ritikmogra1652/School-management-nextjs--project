import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import fetch from "node-fetch";
import { JWT } from "next-auth/jwt"; // Importing JWT type for better typing
import { Session } from "next-auth"; // Importing Session type for better typing

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.DOMAIN}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (res.ok) {
          const user = await res.json(); // User is inferred from next-auth.d.ts
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: { params: { prompt: "select_account" } },
    }),
  ],
  pages: {
    signIn: "/dashboard", // Redirect to dashboard after login
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback to add user information to token
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        console.log(user, "user");

        // Store user information in token
        token.id = user.id;
        token.email = user.email;
        token.username = user.username; // Correctly store 'username' in token
      }
      return token;
    },
    // Session callback to map the JWT token to session
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token; // Map token to session user
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
