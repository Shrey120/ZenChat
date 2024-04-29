import connectDB from "../../../db/config";
import { NextResponse } from "next/server";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request) {
  try {
    connectDB();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 }
      );
    }
    const userPresent = await User.findOne({ email }).catch((error) => {
      return NextResponse.json(
        { message: "Some error occucred" },
        { status: 400 }
      );
    });

    if (userPresent) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new User({
        email,
        name,
        password: hashedPassword,
      });

      await user.save();
      const token = jwt.sign({ name, email }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      const response = NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
      response.cookies.set("token", token);
      return response;
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
