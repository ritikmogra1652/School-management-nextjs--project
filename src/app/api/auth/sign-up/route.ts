import bcrypt from "bcryptjs";
import connectToDatabase from "../../../../lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<Response> {
  await connectToDatabase();

  const { username, email, password }: SignupRequest = await request.json();

  if (!username || !email || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();

  return new NextResponse("User created successfully", { status: 201 });
}
