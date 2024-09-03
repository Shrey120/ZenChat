import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import path from "path";
import { createServer } from "http";
import next from "next"; // Import Next.js
import express from "express";

dotenv.config();

const app = express();
const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://zen-chat-d8bv.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

const socketMap: any = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  const userId: any = socket.handshake.query.userId;
  if (userId) {
    socketMap[userId] = socket;
    console.log(`User ${userId} connected to socketId ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(socketMap));

  socket.on("sendNotification", (data) => {
    const { senderName, receiverId } = data;
    const receiverSocket = socketMap[receiverId];
    if (receiverSocket) {
      receiverSocket.emit("getNotification", {
        message: `${senderName} sent you a friend request`,
      });
    } else {
      console.log("Receiver not connected:", receiverId);
    }
  });

  socket.on("messageSent", (data) => {
    const { message, receiverId, senderId } = data;
    const receiverSocket = socketMap[receiverId];
    if (receiverSocket) {
      receiverSocket.emit("recieveMessage", {
        message: message,
        senderId: senderId,
      });
    } else {
      console.log("Receiver not connected:", receiverId);
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      delete socketMap[userId];
      console.log(`User ${userId} disconnected`);
      io.emit("getOnlineUsers", Object.keys(socketMap));
    }
  });
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const PORT = process.env.NEXT_PUBLIC_PORT || 4000;

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Socket server running on port ${PORT}`);
  });
});

export default connectDB;
export { io };
