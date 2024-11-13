import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../../lib/mongoose";

import User from "@/models/User";
import { NextResponse } from "next/server";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(request: Request): Promise<Response> {
  await connectToDatabase();

  const { username, password }: LoginRequest = await request.json();

  if (!username || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new NextResponse("Invalid credentials", { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return new NextResponse(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
