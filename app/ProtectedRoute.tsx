"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useContextApi } from "@/components/context/context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { currentUser } = useContextApi();
  const message = "Please login to access this page";
  let current: any;

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    current = storedUser && JSON.parse(storedUser);
  }, []);

  useEffect(() => {
    if (!currentUser && !current) {
      router.push("/login");
      toast.error(message);
    }
  }, [currentUser]);

  // Render null if user is not authenticated to avoid displaying the children
  if (!currentUser && !current) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
