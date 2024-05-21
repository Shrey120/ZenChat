import chating from "@/public/Chating.jpg";
import Image from "next/image";
import React from "react";

export const GroupList = () => {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div>
      {a.map((item) => {
        return (
          <div
            key={item}
            className='flex items-center p-5 border-b border-gray-200'>
            <div className='flex items-center'>
              <Image
                className='w-16 h-16 bg-gray-300 rounded-full'
                src={chating}
                alt='user'
                width={64}
                height={64}
              />
              <div className='ml-5'>
                <div className='text-lg font-[700]'>Group Name</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
