"use client";

import React from "react";
import { useRouter } from "next/navigation";
import chating from "@/public/Chating.jpg";
import Image from "next/image";

export const ProfileLayout = () => {
  const router = useRouter();
  const lm =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaevoluptatem, quia, quas, quos quod quibusdam quidem quaevoluptatem, quia, quas, qaaaassss";

  return (
    <div className='max-h-screen bg-gray-100 border-l-[1px] flex flex-col overflow-auto'>
      <div className='relative flex justify-center mt-20'>
        <div className='relative '>
          <Image
            className='h-40 w-40 rounded-full'
            src={chating}
            height={100}
            width={100}
            alt='Hero Image'
          />
          <div className='absolute top-1 left-1 border-[10px] border-gray-100 text-transparent bg-emerald-400 h-10 w-10 rounded-full flex justify-center items-center' />
        </div>
      </div>
      <div className='flex flex-col w-full justify-center items-center px-20 mt-10'>
        <div className='text-3xl font-sans font-extrabold'>Shrey Gupta</div>

        <div className='text-1xl mt-2 font-mono text-gray-400'>
          Kanpur, Uttar Pradesh
        </div>
      </div>
      <div className='text-lg mt-10 font-[500] px-10'>{lm}</div>
      <hr className='mt-10 w-[90%] ml-5' />
      <div className='mt-10 flex flex-col items-center'>
        <div className='flex mb-2  w-56'>
          <div className='text-slate-400 font-semibold'>Phone :</div>
          <div className='ml-3 font-semibold'>+91 8823232323</div>
        </div>
        <div className='flex mb-2   w-56'>
          <div className='text-slate-400 font-semibold'>E-mail :</div>
          <div className='ml-3 font-semibold'>shr@gmail.com</div>
        </div>
        <div className='flex mb-2   w-56'>
          <div className='ml-[0.4rem] text-slate-400 font-semibold'>
            D.O.B :
          </div>
          <div className='ml-3 font-semibold'>23.02.2011</div>
        </div>
      </div>
      <hr className='mt-10 w-[90%] ml-5' />
      <div className='flex flex-col mt-10 px-10'>
        <div className='flex justify-between w-full mb-7'>
          <div className=' text-stone-400 font-semibold'>Media(31)</div>
          <div className='text-teal-300 font-bold'>See All &gt;</div>
        </div>
        <div className='flex justify-between'>
          <Image
            className='h-28 w-28'
            src={chating}
            height={50}
            width={50}
            alt='Hero Image'
          />
          <Image
            className='h-28 w-28'
            src={chating}
            height={50}
            width={50}
            alt='Hero Image'
          />
          <Image
            className='h-28 w-28'
            src={chating}
            height={50}
            width={50}
            alt='Hero Image'
          />
        </div>
      </div>
    </div>
  );
};
