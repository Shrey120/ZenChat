import connectDB from "../../../db/config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../../models/userModel"; // Import UserDocument type/interface
dotenv.config();

interface Request {
  json: () => Promise<any>;
}

export async function POST(req: Request) {
  try {
    connectDB();
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 }
      );
    }

    // Fetch user from database
    const userPresent = await User.findOne({
      email,
    });
    if (userPresent === null) {
      return NextResponse.json({ message: "User not Found" }, { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userPresent.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: userPresent.name, email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    // Prepare response
    const response = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 201 }
    );
    // Set token in cookie
    response.cookies.set("token", token);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
