import React from "react";
import { SiGooglechat } from "react-icons/si";

export const NoMessageLayout = () => {
  return (
    <div className='h-[calc(100vh-210px)] bg-stone-50 border-l-[1px] flex flex-col items-center justify-center'>
      <div className='flex text-7xl font-serif mr-2'>
        <SiGooglechat className='text-violet-800' /> &nbsp; ZenChat
      </div>
      <div className='text-2xl text-bold text-stone-600 mt-7 ml-5'>
        Start the conversation – your first message awaits!
      </div>
    </div>
  );
};
