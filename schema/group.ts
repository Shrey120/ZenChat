"use client";

import { z } from "zod";

export const NewGroupSchema = z.object({
  GroupName: z.string().nonempty(),
  GroupDescription: z.string().nonempty(),
  GroupImage: z.string().nonempty(),
  SelectedGroupMembers: z.array(
    z.object({
      name: z.string().nonempty(),
      id: z.number(),
    })
  ),
});
