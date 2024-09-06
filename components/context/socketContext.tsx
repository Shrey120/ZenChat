"use client";
import io from "socket.io-client";
import { createContext, useState, useContext, useEffect } from "react";
import { useContextApi } from "@/components/context/context";
const SocketContext = createContext<any>(null);
import { toast } from "react-toastify";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, setMessages, timeCal } = useContextApi();

  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [socketio, setSocketio] = useState<any>(null);

  useEffect(() => {
    if (socketio) {
      socketio.on("getNotification", (data: any) => {
        console.log("Notification received:", data);
        toast.success(data.message);
      });
      if (socketio) {
        socketio.on("recieveMessage", (data: any) => {
          setMessages((prev: any) => [
            ...prev,
            {
              message: data.message,
              senderId: data.senderId,
              timeAgo: timeCal(),
            },
          ]);
        });
      }
    }
  }, [socketio]);

  useEffect(() => {
    if (currentUser && !socketio) {
      const socket = io("https://zen-chat-d8bv.onrender.com", {
        query: { userId: currentUser?._id },
        transports: ["websocket"],
        reconnection: true, // Allow reconnection attempts
        secure: true, // Use secure connection
      });

      setSocketio(socket);

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
        console.log(data);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocketio(null);
      });
    }

    return () => {
      if (socketio) {
        socketio.disconnect();
        console.log("Socket disconnected manually");
      }
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socketio, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
