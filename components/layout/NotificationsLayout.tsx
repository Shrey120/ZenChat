"use client";

import React, { useState } from "react";
import { RequestNotifications } from "../notifications/RequestNotifications";
import { GroupNotifications } from "../notifications/GroupNotifications";
import { OtherNotifications } from "../notifications/OtherNotifications";

export const NotificationsLayout = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const handleBorderStyleChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div>
        <div className='text-center font-sans font-[700] text-5xl p-5'>
          Notifications
        </div>
      </div>
      <div className='flex py-2 px-5'>
        <div
          className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4  ${
            activeIndex === 1 ? "border-b-4 border-black" : ""
          }`}
          onClick={(e) => handleBorderStyleChange(1)}>
          Requests
        </div>
        {/* <div
          className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4 ${
            activeIndex === 2 ? "border-b-4 border-black" : ""
          }`}
          onClick={(e) => handleBorderStyleChange(2)}>
          Groups
        </div> */}
        <div
          className={`px-3 cursor-pointer font-semibold text-mono hover:border-b-4  ${
            activeIndex === 3 ? "border-b-4 border-black" : ""
          }`}
          onClick={(e) => handleBorderStyleChange(3)}>
          Others
        </div>
      </div>
      <hr />
      <div className='p-7'>
        {activeIndex === 1 && (
          <div>
            <RequestNotifications />
          </div>
        )}
        {activeIndex === 2 && (
          <div>
            <GroupNotifications />
          </div>
        )}
        {activeIndex === 3 && (
          <div>
            <OtherNotifications />
          </div>
        )}
      </div>
    </div>
  );
};
