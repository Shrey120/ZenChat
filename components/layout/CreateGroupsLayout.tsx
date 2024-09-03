// "use client";

// import profile from "@/public/profile.jpg";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { useContextApi } from "@/app/context";
// import { IoSearch } from "react-icons/io5";
// import { Button } from "../ui/button";
// import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
// import { Textarea } from "../ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { NewGroupSchema } from "@/schema/group";
// import { Input } from "../ui/input";
// import { useFormStatus } from "react-dom";

// type FormValues = z.infer<typeof NewGroupSchema>;

// type Member = {
//   name: string;
//   id: number;
// };

// export const CreateGroupsLayout = () => {
//   const { currentUser, getCurrentUser } = useContextApi();

//   useEffect(() => {
//     getCurrentUser();
//   }, []);

//   console.log(currentUser);
//   const [selectedGroupMembers, setSelectedGroupMembers] = useState<Member[]>(
//     []
//   );

//   const [groupMembers, setGroupMembers] = useState<Member[]>([
//     { name: "User Name", id: 1 },
//     { name: "User", id: 2 },
//     { name: "User Na", id: 3 },
//     { name: "User Nam", id: 4 },
//     { name: "Us", id: 5 },
//     { name: "User N", id: 6 },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const { pending } = useFormStatus();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(NewGroupSchema),
//     defaultValues: {
//       GroupName: "",
//       GroupDescription: "",
//       GroupImage: "",
//       SelectedGroupMembers: [],
//     },
//   });

//   const submitFormHandler = async (data: z.infer<typeof NewGroupSchema>) => {
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...data, selectedGroupMembers, currentUser }),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddRemove = (id: number) => {
//     setSelectedGroupMembers((prev) =>
//       prev.find((member) => member.id === id)
//         ? prev.filter((member) => member.id !== id)
//         : [...prev, groupMembers.find((member) => member.id === id) as Member]
//     );
//   };

//   return (
//     <div className='h-screen overflow-auto scrollbar'>
//       <div className='sticky top-0 bg-white'>
//         <div className='text-center font-sans font-[700] text-5xl p-5'>
//           New Group
//         </div>
//         <div className='w-full'>
//           <div className='flex flex-col items-center'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(submitFormHandler)}>
//                 <div className='grid grid-cols-[repeat(2,minmax(100px,400px))] gap-x-10 '>
//                   <div>
//                     <div className='mt-10 w-full '>
//                       <FormField
//                         control={form.control}
//                         name='GroupName'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>GroupName</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 type='text'
//                                 placeholder='Enter Your GroupName'
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className='mt-10 w-full'>
//                       <FormField
//                         control={form.control}
//                         name='GroupDescription'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>GroupDescription</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 className='resize-none h-36'
//                                 {...field}
//                                 placeholder='Enter Your GroupDescription'
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <div className='mt-10 w-full'>
//                       <FormField
//                         control={form.control}
//                         name='GroupImage'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>GroupImage</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 type='file'
//                                 placeholder='Upload Your GroupImage'
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className='mt-10 w-full'>
//                       <FormField
//                         control={form.control}
//                         name='SelectedGroupMembers'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Selected Group Members</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 className='resize-none h-36 cursor-not-allowed'
//                                 {...field}
//                                 value={selectedGroupMembers
//                                   .map((member) => member.name)
//                                   .join(", ")}
//                                 placeholder='Selected Group Members will show up here'
//                                 readOnly
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   className='w-full my-10'
//                   variant='default'
//                   disabled={pending || loading}>
//                   {loading ? "Loading..." : "Create Group"}
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </div>
//         <div className=' w-3/4 ml-6 bg-gray-50  rounded-full text-2xl p-4 cursor-pointer flex mb-5'>
//           <IoSearch />
//           <input
//             type='text'
//             placeholder='Enter for Search...'
//             className='bg-transparent text-base outline-none ml-3'
//           />
//         </div>
//       </div>
//       {groupMembers.map((member) => (
//         <div
//           key={member.id}
//           className='flex items-center p-5 border-b border-gray-200'>
//           <div className='w-full flex justify-between'>
//             <div className='flex items-center'>
//               <Image
//                 className='w-16 h-16 bg-gray-300 rounded-full'
//                 src={profile}
//                 alt='user'
//                 width={64}
//                 height={64}
//               />
//               <div className='ml-5'>
//                 <div className='text-lg font-[700]'>{member.name}</div>
//               </div>
//             </div>
//             <div onClick={() => handleAddRemove(member.id)}>
//               {selectedGroupMembers.some((m) => m.id === member.id) ? (
//                 <IoIosRemoveCircle className='mt-1 h-10 w-10 text-red-400 cursor-pointer' />
//               ) : (
//                 <IoIosAddCircle className='mt-1 h-10 w-10 text-green-400 cursor-pointer ' />
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
