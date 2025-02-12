import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Role from "@/models/Role";
import images from "@/assets/imgs";

export async function POST(req: NextResponse) {
  try {
    await connectionToDatabase();

    const {
      name,
      birthday,
      username,
      email,
      password,
      image = images.user.src.src,
      role = "user",
    } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleDefault = await Role.findOne({ role });

    if (!roleDefault) {
      return NextResponse.json({ message: "Role not found" }, { status: 400 });
    }

    const newUser = new User({
      name,
      birthday,
      username,
      email,
      password: hashedPassword,
      image: image,
      roleId: roleDefault._id,
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
