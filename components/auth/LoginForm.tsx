"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CardWrapper } from "./CardWrapper";
import roaster from "react-hot-toast";
export const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status === 500 || data.status === 400) {
        roaster.error(data.message);
      } else {
        roaster.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <CardWrapper
        cardHeading='Zenchat'
        cardDescription='Welcome Back, Please login to your account to continue'
        backButtonLabel="Don't Have an account? Register Now"
        backButtonHref='/register'
        showSocial>
        <form
          className='w-full flex items-center flex-col'
          onSubmit={submitFormHandler}>
          <div>
            <label
              htmlFor='email'
              className='block font-semibold mb-1'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-3 text-xs border-2 border-gray-300 rounded-lg p-2 w-[400px]'
              placeholder='Type Your E-Mail'></input>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block font-semibold mb-1'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-3 text-xs border-2 border-gray-300 rounded-lg p-2 w-[400px]'
              placeholder='Type Your Password'></input>
          </div>
          <Button
            className='w-[400px] mt-3'
            variant='default'>
            Log In
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
};
