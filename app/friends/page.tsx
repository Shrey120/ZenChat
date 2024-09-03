import { Header } from "@/components/shared/Header";
import { NextPage } from "next";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";
import { FriendsLayout } from "@/components/layout/FriendsLayout";

const page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <ProtectedRoute>
        <Header />
        <div className='w-full'>
          <FriendsLayout />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default page;
