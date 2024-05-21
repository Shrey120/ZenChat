"use client";

import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiAttachmentOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import chating from "@/public/Chating.jpg";
import Image from "next/image";
import { BiSend } from "react-icons/bi";
import { Message } from "../shared/Message";

const sampleMessage = [
  {
    attachments: [
      {
        public_id: "abc",
        url: "https://buffer.com/library/content/images/2023/10/free-images.jpg",
      },
    ],
    message: "hi there how are you hoayfbdsjf sabd",
    message_id: "123",
    sender: {
      sender_id: "qwe",
      name: "balak",
    },
    chat_id: "chat",
    createdAt: "10-02-2022",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "we",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "qwe",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "qwe",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
  {
    attachments: [
      {
        public_id: "abc",
        url: "z.string()",
      },
    ],
    message: "hi or batao",
    message_id: "123",
    sender: {
      sender_id: "qwe",
      name: "nope",
    },
    chat_id: "chat",
    createdAt: "10-02-2201",
  },
];

const sender = {
  sender_id: "qwe",
  name: "balak",
};

export const ChatLayout = () => {
  const router = useRouter();

  return (
    <div className='h-screen bg-stone-50 border-l-[1px] flex flex-col justify-between'>
      <div className='px-8 py-6 flex'>
        <div className='relative'>
          <Image
            className='h-14 w-14 rounded-full'
            src={chating}
            height={50}
            width={50}
            alt='Hero Image'
          />
          <div className='absolute top-0 left-0 border-[4px] border-gray-50 text-transparent bg-emerald-400 h-4 w-4 rounded-full flex justify-center items-center' />
        </div>
        <div className='flex flex-col pl-4 w-full'>
          <div className='flex justify-between'>
            <div className='text-2xl font-mono font-extrabold'>Shrey</div>
            <div className='text-zinc-400 font-semibold pt-[0.4rem] text-2xl cursor-pointer'>
              <HiDotsHorizontal />
            </div>
          </div>
          <div className='text-zinc-400 font-semibold mt-1'>
            Offline, Last Seen 3h Ago
          </div>
        </div>
      </div>
      <hr />
      <div className='overflow-auto scrollbar h-full '>
        {sampleMessage.map((cur) => (
          <Message
            key={cur.message_id}
            message={cur}
            sender={sender}
          />
        ))}
      </div>
      <hr />
      <div className='bg-white py-5 px-6'>
        <div className='bg-gray-50 rounded-full'>
          <div className='text-3xl p-4 cursor-pointer flex'>
            <TiAttachmentOutline className='text-gray-500 p-1 h-12 w-12' />
            <input
              type='text'
              placeholder='Type a message here...'
              className='bg-transparent text-base outline-none w-full ml-3'
            />
            <BiSend className='bg-teal-500 text-white h-12 w-12 rounded-full p-2' />
          </div>
        </div>
      </div>
    </div>
  );
};
