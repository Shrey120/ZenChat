import mongoose, { Document } from "mongoose";

export interface MessageDocument extends Document {
  chatId: string;
  senderId: string;
  message: string;
  timeAgo: string;
}

const messageSchema = new mongoose.Schema<MessageDocument>({
  chatId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeAgo: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
});

let Messages =
  mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", messageSchema);

export default Messages;
