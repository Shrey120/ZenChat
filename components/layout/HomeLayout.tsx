"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import chating from "@/public/chating.jpg";
import Image from "next/image";

export const HomeLayout = () => {
  const router = useRouter();
  const chat = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8];
  const lm =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaevoluptatem, quia, quas, quos quod quibusdam quidem quaevoluptatem, quia, quas, q";
  const clickHandler = () => {};
  return (
    <div className='h-screen'>
      <div className=' bg-gray-50 m-7 rounded-full mr-40'>
        <div className='text-2xl p-4 ml-3 cursor-pointer flex'>
          <IoSearch />
          <input
            type='text'
            placeholder='Enter for Search...'
            className='bg-transparent text-base outline-none w-full ml-3'
          />
        </div>
      </div>
      <div className='m-7 max-h-[calc(100vh-144px)] overflow-auto scrollbar'>
        {chat.map((cur) => {
          return (
            <div
              onClick={clickHandler}
              key={cur}
              className='bg-slate-800 mb-4 rounded-xl p-10 border-slate-800 border-l-teal-300 border-[10px]'>
              <div className='flex items-center text-white  '>
                <div className='relative flex justify-center'>
                  <Image
                    className='h-16 w-16 rounded-full'
                    src={chating}
                    height={50}
                    width={50}
                    alt='Hero Image'
                  />
                  <div className='absolute top-0 left-0 border-[4px] border-gray-50 text-transparent bg-emerald-400 h-4 w-4 rounded-full flex justify-center items-center' />
                </div>
                <div className='flex flex-col pl-5 w-full'>
                  <div className='flex justify-between'>
                    <div className='text-3xl font-mono font-extrabold '>
                      Shrey
                    </div>
                    <div className='text-zinc-400 font-semibold pt-[0.4rem]'>
                      3h ago
                    </div>
                  </div>
                  <div className=' text-zinc-400 font-semibold'>Online</div>
                </div>
              </div>
              <div className='pt-9 flex justify-between'>
                <div className='font-semibold text-white'>
                  {lm.slice(0, 45)}...
                </div>
                <div className=' bg-teal-300 p-2 h-7 w-7 flex items-center justify-center rounded-full'>
                  2
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
