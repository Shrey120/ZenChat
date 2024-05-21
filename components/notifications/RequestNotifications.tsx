"use client";
import React, { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

type Member = {
  name: string;
  id: number;
};

export const RequestNotifications = () => {
  const [groupMembers, setGroupMembers] = useState<Member[]>([
    { name: "User Name", id: 1 },
    { name: "User Name", id: 2 },
    { name: "User Name", id: 3 },
    { name: "User Name", id: 4 },
    { name: "User Name", id: 5 },
    { name: "User Name", id: 6 },
  ]);

  return (
    <div>
      {groupMembers.map((member) => {
        return (
          <div
            key={member.id}
            className='flex justify-between items-center p-2 border-b border-gray-200'>
            <div className='flex items-center'>
              <img
                src='https://randomuser.me/api/port'
                alt='user'
                className='w-10 h-10 rounded-full'
              />
              <p className='ml-2'>{member.name}</p>
            </div>
            <div className='flex items-center'>
              <button className='bg-gray-50 h-10 w-10 p-3 rounded-full text-green-500 mr-2'>
                <FaCheck />
              </button>
              <button className='bg-gray-50 h-10 w-10 p-3 rounded-full text-red-500'>
                <RxCross1 />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
