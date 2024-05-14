"use client";

import { z } from "zod";

export const ResgisterSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(50),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
