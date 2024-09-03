"use client";

import chating from "@/public/Chating.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useContextApi } from "@/components/context/context";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";

export const RequestNotifications = () => {
  const { currentUser, getCurrentUser } = useContextApi();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const router = useRouter();
  const pendingFriends = currentUser?.requests;

  const acceptRequest = async (id: string) => {
    try {
      const res = await fetch("/api/acceptRequest", {
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
        toast.success(responseData.message);
        getCurrentUser();
        router.refresh;
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      const res = await fetch("/api/removeRequest", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          friendId: currentUser._id,
          userName: currentUser.name,
        }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        getCurrentUser();
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {pendingFriends &&
        pendingFriends.map((item: any) => {
          if (item.status === "requested") {
            return (
              <div
                key={item}
                className='flex items-center p-5 border-b border-gray-200'>
                <div className='flex justify-between w-full'>
                  <div className='flex items-center'>
                    <CldImage
                      className='h-16 w-16 rounded-full'
                      src={item.profileImage?.public_id}
                      height={50}
                      width={50}
                      alt='Hero Image'
                    />
                    <div className='ml-5'>
                      <div className='text-lg font-[700]'>
                        {item.sender.name}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <button
                      className='bg-gray-50 h-10 w-10 p-3 rounded-full text-green-500 mr-2'
                      onClick={() => acceptRequest(item.sender._id)}>
                      <FaCheck />
                    </button>
                    <button
                      className='bg-gray-50 h-10 w-10 p-3 rounded-full text-red-500'
                      onClick={() => rejectRequest(item.sender._id)}>
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};
