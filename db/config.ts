import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import https from "https";
import express from "express";
import fs from "fs";

dotenv.config();

const app = express();
const options = {
  key: fs.readFileSync("path/to/your/private.key"),
  cert: fs.readFileSync("path/to/your/certificate.crt"),
};
const server = https.createServer(options, app);

const io = new Server(server, {
  cors: {
    origin: "https://zen-chat-d8bv.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
  transports: ["websocket", "polling"], // Add 'polling' as a fallback transport
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

  io.emit("getOnlineUsers", Object.keys(socketMap)); // send online users to all clients

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

// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();

//   app.use(express.static("../.next"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(dirPath, "../.next", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});

export default connectDB;
export { io };
