import React, { useEffect } from "react";
import moment from "moment";
import { attachmentFeatures } from "@/lib/attachmentFeatures";
import { RenderAttachment } from "./RenderAttachment";
import { useContextApi } from "@/components/context/context";

export const Message = ({ message, sender, time }: any) => {
  const { currentUser } = useContextApi();

  return (
    <div className='p-5 w-full'>
      {currentUser._id !== sender ? (
        <div className='flex flex-col justify-start '>
          <div className='p-5 font-bold bg-white shadow-2xl w-fit h-fit rounded-full text-lg'>
            {message}
          </div>

          <div className='pl-5 text-sm text-gray-400 font-semibold my-1'>
            {time}
          </div>
          {/* <div>
            {message.attachments.map((attachment, index) => {
              const url = attachment.url;
              const fileFormat = attachmentFeatures(url);

              return (
                <a
                  key={index}
                  href='url'
                  target='_blank'
                  download>
                  {RenderAttachment({ file: fileFormat, url })}
                </a>
              );
            })}
          </div> */}
        </div>
      ) : (
        <div className='flex flex-col items-end w-full'>
          <div className='p-5 font-bold bg-teal-300 text-white shadow-2xl w-fit h-fit rounded-full text-lg'>
            {message}
          </div>
          <div className='pr-5 text-sm text-gray-400 font-semibold mt-1'>
            {time}
          </div>
          {/* <div>
            {message.attachments.map((attachment, index) => {
              const url = attachment.url;
              const fileFormat = attachmentFeatures(url);

              return (
                <a
                  key={index}
                  href='url'
                  target='_blank'
                  download>
                  {RenderAttachment({ file: fileFormat, url })}
                </a>
              );
            })}
          </div> */}
        </div>
      )}
    </div>
  );
};
