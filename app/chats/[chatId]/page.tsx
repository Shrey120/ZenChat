import React from "react";

interface paramsProps {
  params: {
    chatId: string;
  };
}

const page = ({ params }: paramsProps) => {
  return <div>Chat : {params.chatId}</div>;
};

export default page;
