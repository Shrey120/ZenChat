import connectDB from "../../../db/config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "@/models/usersModel"; // Import UserDocument type/interface
dotenv.config();

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
    const userPresent = await Users.findOne({
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
      process.env.NEXT_PUBLIC_JWT_SECRET!,
      {
        expiresIn: "2h",
      }
    );

    // Prepare response
    const response = NextResponse.json(
      {
        User: userPresent,
        message: "User logged in successfully",
      },
      { status: 201 }
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // Set token in cookie
    response.cookies.set("token", token, options);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
