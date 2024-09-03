"use client";

import React, { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiAttachmentOutline } from "react-icons/ti";
import { BiSend } from "react-icons/bi";
import { Message } from "../shared/Message";
import { useContextApi } from "@/components/context/context";
import { CldImage } from "next-cloudinary";
import { useSocketContext } from "../context/socketContext";
import { NoMessageLayout } from "../layout/NoMessageLayout";

export const Messages = () => {
  const { socketio } = useSocketContext();
  const {
    userData,
    messages,
    sentMessage,
    timeCal,
    setMessages,
    currentChatId,
    fetchUsers,
    currentUser,
    getCurrentUser,
  } = useContextApi();
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getCurrentUser();
    fetchUsers();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom on initial load or when messages change
  }, [messages]);

  const sendMessage = (friendId: any) => {
    if (socketio) {
      socketio.emit("messageSent", {
        message: message,
        receiverId: friendId,
        senderId: currentUser._id,
      });
    }
    sentMessage(message, currentUser._id);
    setMessages((prev: any) => [
      ...prev,
      {
        message: message,
        senderId: currentUser._id,
        timeAgo: timeCal(),
      },
    ]);
    setMessage("");
    scrollToBottom();
  };

  return (
    <div className='h-screen bg-stone-50 border-l-[1px] flex flex-col'>
      {userData.map(
        (user: any) =>
          [user._id, currentUser._id].sort().join("-") === currentChatId && (
            <div
              key={user._id}
              className=''>
              <div className='px-8 py-6 flex'>
                <div className='relative'>
                  <CldImage
                    className='h-14 w-14 rounded-full'
                    src={user.profileImage?.public_id}
                    height={50}
                    width={50}
                    alt='Hero Image'
                  />
                  <div className='absolute top-0 left-0 border-[4px] border-gray-50 text-transparent bg-emerald-400 h-4 w-4 rounded-full flex justify-center items-center' />
                </div>
                <div className='flex flex-col pl-4 w-full'>
                  <div className='flex justify-between'>
                    <div className='text-2xl font-mono font-extrabold'>
                      {user.name}
                    </div>
                  </div>
                  <div className='text-zinc-400 font-semibold mt-1'>
                    Offline, Last Seen 3h Ago
                  </div>
                </div>
              </div>
              <hr />
              {messages && messages.length > 0 ? (
                <div
                  key={user._id}
                  className='overflow-auto scrollbar h-[calc(100vh-210px)]'>
                  {messages.map((cur: any) => (
                    <Message
                      key={cur._id}
                      message={cur.message}
                      sender={cur.senderId}
                      time={cur.timeAgo}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <NoMessageLayout />
              )}
              <hr />
              <div className='bg-white p-1'>
                <div className='bg-gray-100 rounded-full flex p-4 m-3'>
                  <TiAttachmentOutline className='text-gray-500 h-9 w-8 cursor-pointer' />
                  <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type a message here...'
                    className='bg-transparent text-base outline-none w-full ml-3 cursor-pointer'
                  />
                  <BiSend
                    className='bg-teal-500 text-white rounded-full p-2 h-9 w-10 cursor-pointer'
                    onClick={() => sendMessage(user._id)}
                  />
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};
