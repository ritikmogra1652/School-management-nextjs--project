import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Replace this mock authentication with any real logic if needed
        const user = {
          id: "1",
          name: "John Doe",
          email: "johndoe@example.com",
        };

        if (
          credentials?.username === "john" &&
          credentials?.password === "password"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
