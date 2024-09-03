import { NextResponse } from "next/server";
import Users from "@/models/usersModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, friendId } = body;
    const user = await Users.findById(userId);
    const friend = await Users.findById(friendId);

    if (!user || !friend) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.requests.push({ sender: friendId, status: "pending" });
    friend.requests.push({ sender: userId, status: "requested" });
    friend.notifications.push({
      message: `${user.name} sent you a friend request`,
    });
    await user.save();
    await friend.save();

    // user.friends.push(friendId);
    // friend.friends.push(userId);
    // await user.save();
    // await friend.save();
    return NextResponse.json({ message: "Request Sent" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
