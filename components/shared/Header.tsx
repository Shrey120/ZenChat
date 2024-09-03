"use client";

import React from "react";
import { SiGooglechat } from "react-icons/si";
import { IoNotifications } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { GiThreeFriends } from "react-icons/gi";

export const Header = () => {
  const router = useRouter();
  return (
    <div className='bg-slate-900 h-100vh w-fit flex flex-col justify-between p-5'>
      <div className='text-3xl '>
        <SiGooglechat className='text-violet-800' />
      </div>

      <div className='text-2xl text-gray-300'>
        <div
          title='Home'
          className='text-3xl mb-6 cursor-pointer'>
          <FaHome onClick={() => router.push("/home")} />
        </div>
        <div
          title='Friends'
          className='text-3xl mb-6 cursor-pointer'>
          <FaPeopleGroup onClick={() => router.push("/friends")} />
        </div>
        <div
          title='Notification'
          className='text-3xl  mb-6 cursor-pointer'>
          <IoNotifications onClick={() => router.push("/notifications")} />
        </div>
        {/* <div
          title='Create Group'
          className='text-3xl mb-6 cursor-pointer'>
          <AiOutlineUsergroupAdd onClick={() => router.push("/creategroup")} />
        </div> */}
        <div
          title='Log Out'
          className='text-3xl mb-6  cursor-pointer'>
          <BiLogOut onClick={() => router.push("/logout")} />
        </div>
      </div>
      <div
        title='Settings'
        className='text-3xl text-gray-100  '>
        <IoSettings />
      </div>
    </div>
  );
};
