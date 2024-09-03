"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { FcOldTimeCamera } from "react-icons/fc";
import Image from "next/image";
import profile from "@/public/profile.jpg";
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
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResgisterSchema } from "@/schema/index";
import { Input } from "../ui/input";
import { useContextApi } from "@/components/context/context";

export const RegisterForm = () => {
  const { setImgPublicId, imgPublicId } = useContextApi();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(ResgisterSchema),
    defaultValues: {
      name: "",
      state: "",
      city: "",
      phone: 0,
      dob: "",
      email: "",
      password: "",
    },
  });

  const submitFormHandler = async (data: z.infer<typeof ResgisterSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, image: imgPublicId }), // Use imgPublicId instead of image
      });
      const responseData = await res.json();
      if (res.status === 500 || res.status === 400) {
        toast.error(responseData.message);
      } else {
        router.push("/login");
        toast.success(responseData.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
    setLoading(false);
  };

  return (
    <div className='h-[100vh] flex justify-center items-center bg-stone-300'>
      <CardWrapper
        cardHeading='Zenchat'
        cardDescription='Join Us, Please Signup to Start your Journey'
        backButtonLabel='Already Have an account? Login Now'
        backButtonHref='/login'
        showSocial>
        <div className='flex flex-col items-center gap-3'>
          <div>
            {imgPublicId ? (
              <CldImage
                className='h-40 w-40 rounded-full'
                src={imgPublicId}
                height={150}
                width={150}
                alt='Uploaded Image'
              />
            ) : (
              <Image
                className='h-40 w-40 rounded-full'
                src={profile}
                height={150}
                width={150}
                alt='Default Profile'
              />
            )}
          </div>
          <div>
            <CldUploadWidget
              uploadPreset='first_preset'
              onSuccess={({ event, info }) => {
                if (event === "success") {
                  const cloudinaryInfo = info as { secure_url?: string }; // Type assertion
                  const secureUrl = cloudinaryInfo.secure_url;
                  if (secureUrl) {
                    setImgPublicId(secureUrl); // Update state with secure_url
                  }
                }
              }}>
              {({ open }) => <Button onClick={() => open()}>Upload</Button>}
            </CldUploadWidget>
          </div>

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
                          type='text'
                          placeholder='Enter Your Name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex justify-between gap-5'>
                <div className='mt-2 w-full'>
                  <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            placeholder='Enter Your State'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mt-2 w-full'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            placeholder='Enter Your City'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex justify-between gap-5'>
                <div className='mt-2 w-full'>
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            inputMode='numeric'
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder='Enter Your 10 digit Number'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mt-2 w-full'>
                  <FormField
                    control={form.control}
                    name='dob'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Of Birth</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='date'
                            placeholder='Enter Your Date Of Birth'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
              <Button
                className='w-full mt-5'
                variant='destructive'
                disabled={pending || loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </CardWrapper>
    </div>
  );
};
