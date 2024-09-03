"use client";

import { NextPage } from "next";
import ProtectedRoute from "@/app/ProtectedRoute";
import { Header } from "@/components/shared/Header";
import { LogoutForm } from "@/components/auth/LogoutForm";

const page: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <ProtectedRoute>
        <Header />
        <LogoutForm />
      </ProtectedRoute>
    </div>
  );
};

export default page;
