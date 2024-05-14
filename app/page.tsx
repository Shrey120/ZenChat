import { SiGooglechat } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/LoginButton";
import { SignUpButton } from "@/components/auth/SignUpButton";
import Image from "next/image";
import bgimg from "@/public/Chating.jpg";
export default function Home() {
  return (
    <main className='h-full flex gap-y-5 flex-col items-center justify-center'>
      <Image
        className='-z-10 brightness-50'
        src={bgimg}
        alt='Hero Image'
        placeholder='blur'
        fill
        quality={100}
        sizes='100vw'
        style={{ objectFit: "cover" }}
      />
      <div className='flex text-7xl text-gray-300 font-serif'>
        <SiGooglechat className='text-violet-800' /> &nbsp; ZenChat
      </div>
      <div className='text-2xl text-bold text-gray-300'>
        Conversations that Connect, Explore, and Inspire.
      </div>
      <div className='flex mt-5'>
        <LoginButton>
          <Button
            className='rounded-none w-28'
            variant='destructive'>
            Login
          </Button>
        </LoginButton>
        <SignUpButton>
          <Button
            className='rounded-none w-28'
            variant='secondary'>
            Signup
          </Button>
        </SignUpButton>
      </div>
    </main>
  );
}
