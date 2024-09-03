"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CardWrapper } from "./CardWrapper";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/index";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { useContextApi } from "@/components/context/context";

export const LoginForm = () => {
  const { loginHandler, loading } = useContextApi();

  const { pending } = useFormStatus();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFormHandler = async (data: z.infer<typeof LoginSchema>) => {
    loginHandler(data);
  };

  return (
    <div className='h-[100vh] flex justify-center items-center bg-stone-300'>
      <CardWrapper
        cardHeading='Zenchat'
        cardDescription='Welcome Back, Please login to your account to continue'
        backButtonLabel="Don't Have an account? Register Now"
        backButtonHref='/register'
        showSocial>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFormHandler)}
            className='w-full'>
            <div className='mt-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='Enter Your Email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='Enter Your Password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className='w-full mt-5'
              variant='destructive'
              disabled={pending || loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
