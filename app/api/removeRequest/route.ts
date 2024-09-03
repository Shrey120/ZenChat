import { NextResponse } from "next/server";
import Users from "@/models/usersModel";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, friendId, userName } = body;

    // Use the $pull operator to remove the request and friend entries
    await Users.findByIdAndUpdate(userId, {
      $pull: {
        requests: { sender: friendId, status: "pending" },
      },
    });

    await Users.findByIdAndUpdate(friendId, {
      $pull: {
        requests: { sender: userId, status: "requested" },
      },
    });

    await Users.updateOne(
      { _id: friendId },
      {
        $push: {
          notifications: {
            message: `${userName} rejected your friend request`,
          },
        },
      }
    );

    return NextResponse.json(
      { message: "Request Removed Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
