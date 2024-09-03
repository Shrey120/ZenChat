import Users from "@/models/usersModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Fetch all users
    const users = await Users.find();
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
