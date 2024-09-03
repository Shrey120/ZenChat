"use client";

import { NextPage } from "next";
import ProtectedRoute from "@/app/ProtectedRoute";
import { Header } from "@/components/shared/Header";
import { ChatLayout } from "@/components/layout/ChatLayout";
import { HomeLayout } from "@/components/layout/HomeLayout";

const Page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <ProtectedRoute>
        <Header />
        <div className='grid grid-cols-[1fr,3fr] w-full'>
          <HomeLayout />
          <ChatLayout />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Page;
