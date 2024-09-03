import React from "react";
import { SiGooglechat } from "react-icons/si";
import { FaLock } from "react-icons/fa";

export const NullLayout = () => {
  return (
    <div className='h-screen bg-stone-50 border-l-[1px] flex flex-col items-center justify-center'>
      <div className='flex text-7xl font-serif mr-2'>
        <SiGooglechat className='text-violet-800' /> &nbsp; ZenChat
      </div>
      <div className='text-2xl text-bold text-stone-600 mt-7 ml-5'>
        Conversations that Connect, Explore, and Inspire.
      </div>
      <div className='text-gray-400 flex absolute bottom-10'>
        <FaLock /> &nbsp; The messages you send are end-to-end Encrypted
      </div>
    </div>
  );
};
