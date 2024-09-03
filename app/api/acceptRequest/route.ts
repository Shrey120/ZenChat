import { NextResponse } from "next/server";
import Users from "@/models/usersModel";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, friendId, userName } = body;
    // Remove the pending request from both users
    await Users.updateOne(
      { _id: userId },
      { $pull: { requests: { sender: friendId } } }
    );

    await Users.updateOne(
      { _id: friendId },

      { $pull: { requests: { sender: userId } } }
    );

    await Users.updateOne(
      { _id: friendId },
      {
        $push: {
          notifications: {
            message: `${userName} accepted your friend request`,
          },
        },
      }
    );
    // Add the accepted request to both users
    await Users.updateOne({ _id: userId }, { $push: { friends: friendId } });
    await Users.updateOne({ _id: friendId }, { $push: { friends: userId } });

    return NextResponse.json({ message: "Request Accepted" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
