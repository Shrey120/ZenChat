"use client";

import React, { useEffect, useState } from "react";
import { FriendsList } from "../list/FriendsList";
import { useContextApi } from "@/components/context/context";
import { NewPeopleList } from "../list/NewPeopleList";
import { PendingRequest } from "../list/PendingRequest";
import { toast } from "react-toastify";

export const FriendsLayout = () => {
  const { fetchUsers } = useContextApi();
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const handleBorderStyleChange = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='h-screen overflow-auto scrollbar'>
      <div className='sticky top-0 bg-white'>
        <div className='text-center font-sans font-[700] text-5xl p-5'>
          Connections
        </div>
        <div className='flex py-2 px-5 '>
          <div
            className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4 ${
              activeIndex === 1 ? "border-b-4 border-black" : ""
            }`}
            onClick={() => handleBorderStyleChange(1)}>
            Friends
          </div>
          <div
            className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4 ${
              activeIndex === 2 ? "border-b-4 border-black" : ""
            }`}
            onClick={() => handleBorderStyleChange(2)}>
            Pending Requests
          </div>
          <div
            className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4 ${
              activeIndex === 3 ? "border-b-4 border-black" : ""
            }`}
            onClick={() => handleBorderStyleChange(3)}>
            New Members
          </div>
        </div>
        <hr />
      </div>
      <div className='p-7'>
        {activeIndex === 1 && (
          <div>
            <FriendsList />
          </div>
        )}
        {activeIndex === 2 && (
          <div>
            <PendingRequest />
          </div>
        )}
        {activeIndex === 3 && (
          <div>
            <NewPeopleList />
          </div>
        )}
      </div>
    </div>
  );
};
