import mongoose, { Schema, Document, Types } from "mongoose";

export interface ChatDocument extends Document {
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
  groupChat: {
    isGroupChat: boolean;
    groupDescription: string;
  };
  creator: Types.ObjectId;
  members: Types.ObjectId[];
}

const chatSchema = new mongoose.Schema<ChatDocument>({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  groupChat: {
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    groupDescription: {
      type: String,
      required: true,
    },
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

let Chats =
  mongoose.models.Chat || mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chats;
