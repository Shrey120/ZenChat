import { NotificationsLayout } from "@/components/layout/NotificationsLayout";
import { Header } from "@/components/shared/Header";
import { NextPage } from "next";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";

const page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <ProtectedRoute>
        <Header />
        <div className='w-full'>
          <NotificationsLayout />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default page;
