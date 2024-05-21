import { Header } from "@/components/shared/Header";
import { NextPage } from "next";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";
import { FriendsLayout } from "@/components/layout/FriendsLayout";

const page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <Header />
      <div className='w-full'>
        <ProtectedRoute
          user={true}
          message='Please Login First'>
          <FriendsLayout />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default page;
