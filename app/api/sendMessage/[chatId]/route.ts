import { NextResponse } from "next/server";
import Messages from "@/models/messageModel";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const id = params.chatId;

    if (!id) {
      return NextResponse.json({
        message: "Invalid User Selected",
        status: 400,
      });
    }

    const messages = await Messages.find({ chatId: id });
    return NextResponse.json({ messages: messages }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to send message" });
  }
}
