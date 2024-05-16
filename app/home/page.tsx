import { NextPage } from "next";
import ProtectedRoute from "@/app/ProtectedRoute";
import { Header } from "@/components/shared/Header";
import { ChatLayout } from "@/components/layout/ChatLayout";
import { HomeLayout } from "@/components/layout/HomeLayout";

const page: NextPage = () => {
  return (
    <div className='grid grid-cols-[50fr,400fr,700fr,300fr]'>
      <Header />
      <ProtectedRoute
        user={true}
        message='Please Login First'>
        <HomeLayout />
        <ChatLayout />
      </ProtectedRoute>
      <Header />
    </div>
  );
};

export default page;
