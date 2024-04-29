import { SiGooglechat } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/LoginButton";
import { SignUpButton } from "@/components/auth/SignUpButton";

export default function Home() {
  return (
    <main className='h-full flex gap-y-5 flex-col items-center justify-center'>
      <div className=" size-full brightness-50 -z-10 absolute  bg-blend-darken bg-cover bg-center h-screen w-screen bg-[url('../images/Chating.jpg')]" />
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
