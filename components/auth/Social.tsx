"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function Social() {
  return (
    <div className='w-full flex items-center justify-center gap-x-2'>
      <Button
        className='w-[195px]'
        variant='default'>
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        className='w-[195px]'
        variant='default'>
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
}
