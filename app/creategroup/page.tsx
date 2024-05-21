import { Header } from "@/components/shared/Header";
import { NextPage } from "next";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";
import { CreateGroupsLayout } from "@/components/layout/CreateGroupsLayout";

const page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <Header />
      <div className='w-full'>
        <ProtectedRoute
          user={true}
          message='Please Login First'>
          <CreateGroupsLayout />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default page;
