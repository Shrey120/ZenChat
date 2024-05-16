import React from "react";
import { SiGooglechat } from "react-icons/si";
import { IoSearch, IoNotifications } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
export const Header = () => {
  return (
    <div className='bg-slate-900 h-100vh p-1'>
      <div className='text-3xl p-2 flex justify-start flex-col items-center'>
        <SiGooglechat className='text-violet-800' />
      </div>

      <div className='text-2xl text-gray-300 h-[90vh] flex justify-center flex-col items-center'>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <FaHome />
        </div>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <FaPeopleGroup />
        </div>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <IoNotifications />
        </div>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <IoSearch />
        </div>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <AiOutlineUsergroupAdd />
        </div>
        <div className='text-3xl p-2 my-[5px] cursor-pointer'>
          <BiLogOut />
        </div>
      </div>
      <div className='text-3xl text-gray-100 p-2 flex justify-end flex-col items-center '>
        <IoSettings />
      </div>
    </div>
  );
};
