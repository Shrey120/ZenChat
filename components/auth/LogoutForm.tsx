"use client";
import { useRouter } from "next/navigation";
import img from "@/public/profile.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContextApi } from "@/components/context/context";
import { useSocketContext } from "../context/socketContext";
import { CldImage } from "next-cloudinary";

export const LogoutForm = () => {
  const { socketio } = useSocketContext();
  const { currentUser, setLoading, setCurrentChatId } = useContextApi();
  const router = useRouter();

  if (currentUser)
    return (
      <div className='w-full bg-gray-200'>
        <div className='flex items-center justify-center h-full'>
          <div className='shadow-2xl p-10 '>
            <div className='flex flex-col items-center justify-center'>
              <div className='relative flex justify-center mt-20'>
                <div className='relative '>
                  <CldImage
                    className='h-40 w-40 rounded-full'
                    src={currentUser.profileImage.public_id}
                    height={100}
                    width={100}
                    alt='Hero Image'
                  />
                  <div className='absolute top-1 left-1 border-[10px] border-gray-100 text-transparent bg-emerald-400 h-10 w-10 rounded-full flex justify-center items-center' />
                </div>
              </div>
              <div className='text-3xl mt-7 font-sans font-extrabold'>
                {currentUser.name}
              </div>

              <div className='text-1xl mt-2 font-mono text-gray-400'>
                {currentUser.city}, {currentUser.state}
              </div>

              <div className='text-lg mt-9 font-[500] px-10'>
                {currentUser.status}
              </div>
              <div className='mt-10'>
                <div className='flex mb-1 w-full'>
                  <div className='text-slate-400 font-semibold'>Phone :</div>
                  <div className='ml-3 font-semibold'>
                    +91 {currentUser.phone}
                  </div>
                </div>
                <div className='flex mb-1 w-full'>
                  <div className='text-slate-400 font-semibold'>E-mail :</div>
                  <div className='ml-3 font-semibold'>
                    {[...currentUser.email].slice(0, 25)}
                  </div>
                </div>
                <div className='flex mb-2 w-full'>
                  <div className='ml-[0.4rem] text-slate-400 font-semibold'>
                    D.O.B :
                  </div>
                  <div className='ml-3 font-semibold'>
                    {[...currentUser.dob].slice(0, 10)}
                  </div>
                </div>
              </div>
              <Button
                className='mt-5 w-full'
                variant='destructive'
                onClick={() => {
                  setLoading(false);
                  setCurrentChatId("");
                  localStorage.removeItem("currentUser");
                  localStorage.removeItem("currentId");
                  socketio.disconnect();
                  router.push("/login");
                }}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};
