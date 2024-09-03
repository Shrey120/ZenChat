"use client";

import React, { useEffect, useState } from "react";
import { useContextApi } from "@/components/context/context";
import { CldImage } from "next-cloudinary";

export const FriendsList = () => {
  const { getCurrentUser, currentUser } = useContextApi();
  const [loadingButtons, setLoadingButtons] = useState<string[]>([]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  let friends;

  if (currentUser) {
    friends = currentUser.friends;
  }

  const removeFriend = async (id: string) => {
    setLoadingButtons((prev) => [...prev, id]);
    try {
      const res = await fetch("/api/removeFriend", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          friendId: id,
          userName: currentUser.name,
        }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        getCurrentUser(currentUser._id);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingButtons((prev) => prev.filter((buttonId) => buttonId !== id));
  };

  return (
    <div>
      {friends &&
        friends.map((item: any) => (
          <div
            key={item._id}
            className='flex items-center p-5 border-b border-gray-200'>
            <div className='flex items-center'>
              <CldImage
                className='h-16 w-16 rounded-full'
                src={item.profileImage?.public_id}
                height={50}
                width={50}
                alt='Hero Image'
              />
              <div className='ml-5'>
                <div className='text-lg font-[700]'>{item.name}</div>
              </div>
            </div>
            <div className='flex-grow' />
            <div className='flex items-center'>
              <div className='ml-5'>
                <button
                  className='border-2 rounded-full px-5 text-red-500 py-2 border-red-500 cursor-pointer hover:bg-red-400 hover:text-white'
                  onClick={() => removeFriend(item._id)}>
                  {loadingButtons.includes(item._id)
                    ? "Loading..."
                    : "Remove Friend"}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
