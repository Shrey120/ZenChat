import profile from "@/public/profile.jpg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useContextApi } from "@/components/context/context";
import { toast } from "react-toastify";
import { useSocketContext } from "@/components/context/socketContext";
import { CldImage } from "next-cloudinary";

interface User {
  name: string;
  email: string;
  password: string;
  profileImage: {
    public_id: string;
  };
  status: string;
  _id: string;
  state: string;
  city: string;
  phone: number;
  dob: Date;
}

export const NewPeopleList = () => {
  const { socketio } = useSocketContext();
  const { currentUser, userData, getCurrentUser } = useContextApi();

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loadingButtons, setLoadingButtons] = useState<string[]>([]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.friends) {
      const updatedFilteredUsers = userData.filter(
        (user: User) =>
          !currentUser.friends.some(
            (friend: User) => friend._id === user._id
          ) &&
          user._id !== currentUser._id &&
          !currentUser.requests.some(
            (request: any) => request.sender._id === user._id
          )
      );
      setFilteredUsers(updatedFilteredUsers);
    }
  }, [currentUser, currentUser._id]);

  const addFriend = async (id: string) => {
    setLoadingButtons((prev) => [...prev, id]);

    try {
      const res = await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id, friendId: id }),
      });
      const responseData = await res.json();
      if (res.status === 201) {
        toast.success(responseData.message);
        socketio.emit("sendNotification", {
          senderName: currentUser.name,
          receiverId: id,
        });
        getCurrentUser();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingButtons((prev) => prev.filter((buttonId) => buttonId !== id));
  };

  return (
    <div>
      {filteredUsers &&
        filteredUsers.map((item: User) => (
          <div
            key={item._id}
            className='flex items-center p-5 border-b border-gray-200'>
            <div className='flex items-center'>
              <CldImage
                className='w-16 h-16 bg-gray-300 rounded-full'
                src={item.profileImage?.public_id}
                alt='user'
                width={64}
                height={64}
              />
              <div className='ml-5'>
                <div className='text-lg font-[700]'>{item.name}</div>
              </div>
            </div>
            <div className='flex-grow' />
            <div className='flex items-center'>
              <div className='ml-5'>
                <button
                  className='border-2 rounded-full px-5 text-green-300 py-2 border-green-400 cursor-pointer hover:bg-green-400 hover:text-white'
                  disabled={loadingButtons.includes(item._id)}
                  onClick={() => addFriend(item._id)}>
                  {loadingButtons.includes(item._id)
                    ? "Loading..."
                    : "Add Friend"}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
