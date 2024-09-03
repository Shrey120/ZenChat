import connectDB from "../../../db/config";
import { NextResponse } from "next/server";
import User from "@/models/usersModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, state, city, phone, dob, email, password, image } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 }
      );
    }

    const UserPresent = await User.findOne({ email });

    if (UserPresent) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      state,
      city,
      phone,
      dob,
      profileImage: {
        public_id: image,
      },
      password: hashedPassword,
    });

    try {
      await user.save();
      const response = NextResponse.json(
        { message: "User created successfully! Now Login To Continue" },
        { status: 201 }
      );

      return response;
    } catch (saveError) {
      return NextResponse.json(
        { message: "Error saving user", error: saveError },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error detected", error: error },
      { status: 500 }
    );
  }
}
