"use client";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { FcOldTimeCamera } from "react-icons/fc";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import { resolve } from "path";
import { useFormStatus } from "react-dom";
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
import { ResgisterSchema } from "@/schema/index";
import { Input } from "../ui/input";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(ResgisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitFormHandler = (data: z.infer<typeof ResgisterSchema>) => {
    setLoading(true);
  };
  // const submitFormHandler = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     console.log(image);
  //     const res = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password, image }),
  //     });
  //     const data = await res.json();
  //     if (res.status === 500 || res.status === 400) {
  //       toast.error(data.message);
  //     } else {
  //       toast.success(data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Server Error");
  //   }
  // };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file);
    }
  };
  const ImageChanger = () => {
    inputRef.current?.click();
  };
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <CardWrapper
        cardHeading='Zenchat'
        cardDescription='Join Us, Please Signup to Start your Journey'
        backButtonLabel='Already Have an account? Login Now'
        backButtonHref='/login'
        showSocial>
        <div className='flex flex-col items-center'>
          <div className='relative flex justify-center'>
            {image ? (
              <Image
                className='h-40 w-40 rounded-full '
                src={URL.createObjectURL(image)}
                height={150}
                width={150}
                alt='Hero Image'
              />
            ) : (
              <Image
                className='h-40 w-40 rounded-full '
                src={profile}
                height={150}
                width={150}
                alt='Hero Image'
              />
            )}
            <div className='absolute bottom-2 right-2'>
              <FcOldTimeCamera
                className='bg-white p-1 rounded-full size-8 cursor-pointer hover:bg-gray-200'
                onClick={ImageChanger}
              />
            </div>
          </div>
          <input
            type='file'
            ref={inputRef}
            accept='image/*'
            onChange={(e) => handleFileChange(e)}
            style={{ display: "none" }}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitFormHandler)}
              className='w-full'>
              <div className='mt-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full'
                          {...field}
                          type='name'
                          placeholder='Enter Your Name'
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
              {loading ? "Loading..." : "Register"}
            </Button>
          </Form>
        </div>
      </CardWrapper>
    </div>
  );
};
