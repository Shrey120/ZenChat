import React, { useEffect } from "react";
import { useContextApi } from "@/components/context/context";
import { Message } from "../shared/Message";

export const OtherNotifications = () => {
  const { currentUser, getCurrentUser } = useContextApi();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const notifications = currentUser?.notifications;

  return (
    <div>
      {notifications &&
        [...notifications].reverse().map((item: any) => (
          <div
            key={item._id}
            className='flex font-extrabold items-center py-5 px-2 border-b border-gray-200'>
            <p>{item.message}</p>
          </div>
        ))}
    </div>
  );
};
