import React from "react";
import moment from "moment";
import { attachmentFeatures } from "@/lib/attachmentFeatures";
import { RenderAttachment } from "./RenderAttachment";
interface MessageProps {
  message: {
    attachments: {
      public_id: string;
      url: string;
    }[];
    message: string;
    message_id: string;
    sender: {
      sender_id: string;
      name: string;
    };
    chat_id: string;
    createdAt: string;
  };
  sender: {
    sender_id: string;
    name: string;
  };
}

export const Message = ({ message, sender }: MessageProps) => {
  const timeAgo = moment(message.createdAt).fromNow();
  return (
    <div className='p-5 w-full'>
      {message.sender.sender_id === sender.sender_id ? (
        <div className='flex flex-col justify-start '>
          <div className='p-5 font-bold bg-white shadow-2xl w-fit h-fit rounded-full text-lg'>
            {message.message && message.message}
          </div>

          <div className='pl-5 text-sm text-gray-400 font-semibold my-1'>
            {timeAgo}
          </div>
          <div>
            {message.attachments.map((attachment, index) => {
              const url = attachment.url;
              const fileFormat = attachmentFeatures(url);

              return (
                <a
                  href='url'
                  target='_blank'
                  download>
                  {RenderAttachment({ file: fileFormat, url })}
                </a>
              );
            })}
          </div>
          <div className='pl-5 text-sm text-gray-400 font-semibold mt-1'>
            {timeAgo}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-end w-full'>
          <div className='p-5 font-bold bg-teal-300 text-white shadow-2xl w-fit h-fit rounded-full text-lg'>
            {message.message && message.message}
          </div>
          <div className='pr-5 text-sm text-gray-400 font-semibold mt-1'>
            {timeAgo}
          </div>
          <div>
            {message.attachments.map((attachment, index) => {
              const url = attachment.url;
              const fileFormat = attachmentFeatures(url);

              return (
                <a
                  href='url'
                  target='_blank'
                  download>
                  {RenderAttachment({ file: fileFormat, url })}
                </a>
              );
            })}
          </div>
          <div className='pl-5 text-sm text-gray-400 font-semibold mt-1'>
            {timeAgo}
          </div>
        </div>
      )}
    </div>
  );
};
