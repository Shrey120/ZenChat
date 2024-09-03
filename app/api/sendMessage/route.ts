import { NextResponse } from "next/server";
import Messages from "@/models/messageModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, currentChatId, senderId } = body;

    if (!message || !currentChatId) {
      return NextResponse.json({ message: "Invalid data", status: 400 });
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    Messages.create({
      chatId: currentChatId,
      senderId: senderId,
      message: message,
      timeAgo: time,
    });
    return NextResponse.json({ message: "Message sent" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to send message" });
  }
}
