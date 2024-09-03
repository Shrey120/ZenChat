import User from "@/models/usersModel";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    if (userId) {
      // Fetch single user with populated friends
      const user = await User.findById(userId)
        .populate("friends", "name profileImage")
        .populate("requests.sender", "name profileImage"); // Populate friends with only the 'name' field
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 400 }
        );
      }

      return NextResponse.json({ user: user }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error this User" },
      { status: 500 }
    );
  }
}
