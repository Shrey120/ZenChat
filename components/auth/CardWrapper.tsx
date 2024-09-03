"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Social from "./Social";
import { BackButton } from "./BackButtonLabel";
import { SiGooglechat } from "react-icons/si";
interface cardWrapperProps {
  children: React.ReactNode;
  cardHeading: string;
  cardDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  cardHeading,
  backButtonHref,
  cardDescription,
  showSocial,
}: cardWrapperProps) => {
  return (
    <Card className='w-[500px] shadow-2xl bg-opacity-70 bg-white'>
      <CardHeader>
        <CardTitle className='flex justify-center mb-2'>
          <SiGooglechat className='text-violet-800 h-7 w-7 mr-3' />
          {cardHeading}
        </CardTitle>
        <CardDescription className='flex justify-center'>
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
