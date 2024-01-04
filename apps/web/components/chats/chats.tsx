import { Button, Card, CardHeader, CardTitle } from "@repo/ui/src/components";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@repo/ui/src/components/avatar";
import { api } from "../../convex/_generated/api";
import { usePaginatedQuery, useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const Chat = ({
  name,
  time,
  chatId,
  characterId,
}: {
  name: string;
  time: string;
  chatId: Id<"chats">;
  characterId: Id<"characters">;
}) => {
  const character = useQuery(api.characters.get, {
    id: characterId as Id<"characters">,
  });
  const message = useQuery(api.messages.mostRecentMessage, {
    chatId,
  });
  const recentMessageAt = message?._creationTime
    ? (message?._creationTime as number)
    : time;
  return (
    <Link href={`/character/${characterId}`}>
      <li className="hover:bg-muted p-4 group">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              alt={`preview of chat ${name}`}
              src={character?.cardImageUrl}
              className="object-cover"
              width={300}
              height={525}
            />
            <AvatarFallback>
              {name ? name : character?.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">
                {name ? name : character?.name ? character?.name : "Loading"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(recentMessageAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {message?.text ? message?.text : "Click here to chat."}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default function Chats() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.chats.list,
    {},
    { initialNumItems: 10 }
  );
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      loadMore(10);
    }
  }, [inView, loadMore]);
  return (
    <Card className="w-full shadow-none lg:shadow-xl border-transparent lg:border-border overflow-hidden h-full rounded-b-none">
      <CardHeader>
        <CardTitle>Chats</CardTitle>
      </CardHeader>
      <ul className="divide-y divide-border">
        {results?.length ? (
          results.map((chat) => (
            <Chat
              name={chat.chatName as string}
              time={chat.updatedAt}
              characterId={chat.characterId as Id<"characters">}
              chatId={chat._id as Id<"chats">}
            />
          ))
        ) : (
          <div className="w-full h-[100vh] items-center justify-center flex flex-col gap-2">
            New chats will appear here.
            <Link href="/">
              <Button>Start Chat</Button>
            </Link>
          </div>
        )}
        <div ref={ref} />
      </ul>
    </Card>
  );
}
