"use client";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tooltip,
} from "@repo/ui/src/components";
import Image from "next/image";
import { Dialog } from "../../dialog";
import Spinner from "@repo/ui/src/components/spinner";
import useStoreChatEffect from "../../lib/hooks/use-store-chat-effect";
import { MessagesSquare } from "lucide-react";
import { FadeInOut, nFormatter } from "../../lib/utils";
import { SignIn, useUser } from "@clerk/nextjs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/src/components/drawer";
import { AnimatePresence, motion } from "framer-motion";

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const data = useQuery(api.characters.get, {
    id: params.id as Id<"characters">,
  });
  const creatorName = useQuery(api.users.getUsername, {
    id: data?.creatorId as Id<"users">,
  });
  const chatId = useStoreChatEffect(params.id as Id<"characters">);
  return (
    <div className="w-full flex flex-col justify-self-start lg:pr-6">
      <Card className="w-full h-full lg:h-[42rem] xl:h-[50rem] shadow-none lg:shadow-xl border-transparent lg:border-border flex lg:flex-row flex-col">
        <Drawer>
          <DrawerTrigger asChild>
            <CardHeader className="border-b lg:border-b-0 lg:border-r lg:w-96 lg:h-[42rem] xl:h-[50rem] relative justify-end cursor-pointer">
              {data?.cardImageUrl && (
                <Image
                  src={data.cardImageUrl}
                  alt={`Character card of ${data?.name}`}
                  width={300}
                  height={525}
                  quality={60}
                  className="object-cover absolute w-full h-full lg:rounded-l-lg left-0 top-0 pointer-events-none"
                />
              )}
              {data?.cardImageUrl && (
                <div className="bg-gradient-to-b from-transparent to-black/75 absolute -left-0 -bottom-0 w-full h-full lg:rounded-l-lg" />
              )}
              <CardTitle
                className={`${
                  data?.cardImageUrl ? "text-white" : "text-foreground"
                } text-xl z-[1] flex justify-between`}
              >
                <div className="w-[80%] truncate">{data?.name}</div>
                <Tooltip content={`Number of chats with ${data?.name}`}>
                  <div className="text-white text-xs rounded-full group-hover:opacity-80 duration-200 z-[3] flex gap-0.5 items-center">
                    <MessagesSquare className="w-5 h-5 p-1 aspect-square" />
                    {nFormatter(data?.numChats as number)}
                  </div>
                </Tooltip>
              </CardTitle>
              <p
                className={`${
                  data?.cardImageUrl ? "text-white" : "text-foreground"
                } z-[1] lg:line-clamp-5 line-clamp-3 hover:line-clamp-none text-sm`}
              >
                {data?.description}
              </p>
              {creatorName && (
                <p
                  className={`${
                    data?.cardImageUrl
                      ? "text-muted dark:text-gray-500"
                      : "text-muted-foreground"
                  } z-[1] lg:line-clamp-5 line-clamp-3 hover:line-clamp-none text-xs`}
                >
                  Created by @{creatorName}
                </p>
              )}
            </CardHeader>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{data?.name}</DrawerTitle>
              <DrawerDescription>{`${data?.description}, created by @${creatorName}`}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <CardContent className="w-full h-full p-0">
          {chatId ? (
            <Dialog
              name={data?.name as string}
              welcomeMessage={
                data?.greetings ? (data.greetings[0] as string) : undefined
              }
              model={data?.model as string}
              chatId={chatId}
              characterId={data?._id as any}
              cardImageUrl={data?.cardImageUrl}
            />
          ) : isAuthenticated && !isLoading ? (
            <div className="w-full h-full items-center justify-center flex">
              <Spinner />
            </div>
          ) : (
            <div className="w-full h-full items-center justify-center min-h-[60vh] lg:min-h-fit flex flex-col gap-8">
              <AnimatePresence>
                {data?.name && (
                  <motion.span
                    {...FadeInOut}
                    className="font-medium"
                  >{`Sign in and start chat with ${data?.name}`}</motion.span>
                )}
              </AnimatePresence>
              {!user && <SignIn />}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
