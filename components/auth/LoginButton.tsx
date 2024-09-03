"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/login");
  };

  return <div onClick={clickHandler}>{children}</div>;
};
