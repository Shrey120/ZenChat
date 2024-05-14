"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CardWrapper } from "./CardWrapper";
import { toast } from "react-toastify";
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

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFormHandler = (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
  };
  // const submitFormHandler = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await res.json();
  //     console.log(res);
  //     if (res.status === 201) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='h-[100vh] flex justify-center items-center'>
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
          </form>
          <Button
            className='w-full mt-5'
            variant='default'
            disabled={pending || loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form>
      </CardWrapper>
    </div>
  );
};
