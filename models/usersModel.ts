import mongoose, { Document, Types } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  state: string;
  city: string;
  phone: number;
  dob: Date;
  status: string;
  email: string;
  password: string;
  profileImage: {
    public_id: string;
  };
  notifications: {
    _id: false;
    message: string;
  }[];
  friends: Types.ObjectId[];
  requests: {
    _id: false;
    sender: Types.ObjectId;
    status: string;
  }[];
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  notifications: [
    {
      _id: false,
      message: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: "Hey there! I am using ZenChat 🚀",
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
  },
  requests: [
    {
      _id: false,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        default: "pending",
      },
    },
  ],
});

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
