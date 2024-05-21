import React from "react";
import { AiFillFolderOpen } from "react-icons/ai";
export const RenderAttachment = ({ file, url }: any) => {
  switch (file) {
    case "image":
      return (
        <img
          src={url}
          alt='attachment'
          className='w-44 h-40 rounded-lg shadow-2xl object-contain'
        />
      );
    case "video":
      return (
        <video
          src={url}
          controls
          preload='none'
          className='w-40 h-40 rounded-lg shadow-2xl'
        />
      );
    case "audio":
      return (
        <audio
          src={url}
          preload='none'
          controls
          className='w-40 h-40 rounded-lg shadow-2xl'
        />
      );
    default:
      return <AiFillFolderOpen className='w-40 h-40 rounded-lg shadow-2xl' />;
  }
};
