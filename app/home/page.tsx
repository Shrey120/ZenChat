import { NextPage } from "next";
import ProtectedRoute from "@/app/ProtectedRoute";
import { Header } from "@/components/shared/Header";
import { ChatLayout } from "@/components/layout/ChatLayout";
import { HomeLayout } from "@/components/layout/HomeLayout";

const page: NextPage = () => {
  return (
    <div className='flex h-screen '>
      <Header />
      <div className='grid grid-cols-[1fr,3fr] w-full'>
        <ProtectedRoute
          user={true}
          message='Please Login First'>
          <HomeLayout />
          <ChatLayout />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default page;
