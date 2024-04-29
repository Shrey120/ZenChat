"use client";
import { useRouter } from "next/navigation";

interface SignUpProps {
  children: React.ReactNode;
}

export const SignUpButton = ({ children }: SignUpProps) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/register");
  };

  return <div onClick={clickHandler}>{children}</div>;
};
