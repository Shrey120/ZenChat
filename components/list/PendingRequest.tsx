import chating from "@/public/Chating.jpg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useContextApi } from "@/components/context/context";
import { toast } from "react-toastify";
import { CldImage } from "next-cloudinary";

export const PendingRequest = () => {
  const { getCurrentUser, currentUser } = useContextApi();

  const [loadingButtons, setLoadingButtons] = useState<string[]>([]);
  const [hoveredButtons, setHoveredButtons] = useState<string[]>([]);

  const pendingFriends = currentUser?.requests;
  useEffect(() => {
    getCurrentUser();
  }, []);

  const removeFriend = async (id: string) => {
    setLoadingButtons((prev) => [...prev, id]);
    try {
      const res = await fetch("/api/removeRequest", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id, friendId: id }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        toast.success(responseData.message);
        getCurrentUser();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingButtons((prev) => prev.filter((buttonId) => buttonId !== id));
  };

  const handleMouseEnter = (id: string) => {
    setHoveredButtons((prev) => [...prev, id]);
  };

  const handleMouseLeave = (id: string) => {
    setHoveredButtons((prev) => prev.filter((buttonId) => buttonId !== id));
  };

  return (
    <div>
      {pendingFriends &&
        pendingFriends.map((item: any) => {
          if (item.status === "pending") {
            const isLoading = loadingButtons.includes(item.sender._id);
            const isHovered = hoveredButtons.includes(item.sender._id);

            return (
              <div
                key={item.sender._id}
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
                    <div className='ml-5 text-lg font-[700]'>
                      {item.sender.name}
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <button
                      className={`border-2 rounded-full px-5 py-2 cursor-pointer ${
                        isLoading
                          ? "text-red-500 border-red-500"
                          : isHovered
                          ? "text-white bg-red-500 border-red-500"
                          : "text-yellow-300 border-yellow-400"
                      }`}
                      disabled={isLoading}
                      onClick={() => removeFriend(item.sender._id)}
                      onMouseEnter={() => handleMouseEnter(item.sender._id)}
                      onMouseLeave={() => handleMouseLeave(item.sender._id)}>
                      {isLoading
                        ? "Loading..."
                        : isHovered
                        ? "Cancel"
                        : "Pending"}
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
