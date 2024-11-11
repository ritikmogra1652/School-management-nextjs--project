// lib/auth.ts

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]";

export const getAuthSession = async (context: any) => {
  return await getServerSession(authOptions, context);
};
