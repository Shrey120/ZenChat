import profile from "@/public/profile.jpg";
import Image from "next/image";
import React from "react";

export const NewPeopleList = () => {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
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
                src={profile}
                alt='user'
                width={64}
                height={64}
              />
              <div className='ml-5'>
                <div className='text-lg font-[700]'>User Name</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
