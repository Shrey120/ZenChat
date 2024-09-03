"use client";

import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useContextApi } from "@/components/context/context";
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

export const HomeLayout = () => {
  const { onlineUsers } = useSocketContext();
  const { settingChatId, currentUser, getCurrentUser, currentChatId } =
    useContextApi();
  const [searchItem, setSearchItem] = useState("");
  const [searchedData, setSearchedData] = useState<User[]>([]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setSearchedData(currentUser?.friends);
    }
  }, [currentUser]);

  useEffect(() => {
    if (searchItem.trim() !== "") {
      const query = searchItem.toLowerCase();
      const searched = currentUser.friends.filter((user: any) =>
        user.name.toLowerCase().startsWith(query)
      );
      setSearchedData(searched);
    } else if (currentUser && currentUser.friends) {
      setSearchedData(currentUser.friends);
    }
  }, [searchItem]);

  return (
    <div>
      <div className='bg-gray-50 m-7 rounded-full mr-40 text-2xl p-4 ml-7 cursor-pointer flex w-[80%]'>
        <IoSearch />
        <input
          type='text'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder='Enter for Search...'
          className='bg-transparent text-base outline-none w-[90%] ml-3'
        />
      </div>
      <div className='m-7 max-h-[calc(100vh-144px)] overflow-auto scrollbar'>
        {searchedData &&
          searchedData.map((cur: User) => {
            const isOnline = onlineUsers.includes(cur._id);

            return (
              <div
                key={cur._id}
                onClick={() => settingChatId(currentUser._id, cur._id)}
                className={
                  [cur._id, currentUser._id].sort().join("-") === currentChatId
                    ? " bg-slate-800 mb-7 rounded-xl p-10 border-slate-800 border-l-teal-300 border-[10px] shadow-md shadow-ring cursor-pointer"
                    : " bg-gray-700 mb-7 rounded-xl p-10 border-gray-700 border-l-red-400 border-[10px] shadow-md shadow-ring cursor-pointer"
                }>
                <div className='flex items-center text-white  '>
                  <div className='relative flex justify-center'>
                    <CldImage
                      className='h-16 w-16 rounded-full'
                      src={cur.profileImage?.public_id}
                      height={50}
                      width={50}
                      alt='Hero Image'
                    />
                    <div className='absolute top-0 left-0 border-[4px] border-gray-50 text-transparent bg-emerald-400 h-4 w-4 rounded-full flex justify-center items-center' />
                  </div>
                  <div className='flex flex-col pl-5 w-full'>
                    <div className='flex justify-between'>
                      <div className='text-3xl font-mono font-extrabold '>
                        {cur.name}
                      </div>
                      <div className='text-zinc-400 font-semibold pt-[0.4rem]'>
                        3h ago
                      </div>
                    </div>
                    {isOnline ? (
                      <div className='text-emerald-400 font-semibold'>
                        Online
                      </div>
                    ) : (
                      <div className=' text-red-400 font-semibold'>Offline</div>
                    )}
                  </div>
                </div>
                {/* <div className='pt-9 flex justify-between'>
                  <div className='font-semibold text-white'>
                    {lm.slice(0, 45)}...
                  </div>
                  <div className=' bg-teal-300 p-2 h-7 w-7 flex items-center justify-center rounded-full'>
                    2
                  </div>
                </div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};
