// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Augmenting the next-auth module to extend its Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    } & DefaultSession["user"]; // Extending the default session user
  }

  interface User {
    id: string;
    username: string;
    email: string;
    // Add any other properties from your MongoUser model if necessary
  }
}
