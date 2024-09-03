"use client";

import { useContextApi } from "@/components/context/context";
import { NullLayout } from "./NullLayout";
import { Messages } from "../personalChat/Messages";

export const ChatLayout = () => {
  const { currentChatId } = useContextApi();
  return (
    <div className='bottom-0 '>
      {currentChatId ? <Messages /> : <NullLayout />}
    </div>
  );
};
