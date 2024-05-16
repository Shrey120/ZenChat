"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: any;
  message: string;
}

const ProtectedRoute = ({ children, user, message }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      toast.error(message);
    }
  }, [user, router, message]);

  // Render null if user is not authenticated to avoid displaying the children
  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
