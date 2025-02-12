import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextResponse) {
  try {
    await connectionToDatabase();

    const { username, email, password, role } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextResponse) {
  try {
    await connectionToDatabase();

    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
