import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Tooltip,
} from "@repo/ui/src/components";
import { AspectRatio } from "@repo/ui/src/components/aspect-ratio";
import { MessagesSquare, Repeat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { nFormatter } from "../../app/lib/utils";
import ModelBadge from "../characters/model-badge";
import DraftBadge from "../characters/draft-badge";

const CharacterCard = (props: {
  id: string;
  name: any;
  description: any;
  numChats?: number;
  cardImageUrl?: string;
  model?: any;
  isDraft?: boolean;
  showEdit?: any;
  showRemix?: boolean;
}) => {
  return (
    <AspectRatio
      ratio={1 / 1.75}
      className="group w-full h-full hover:-translate-y-1 duration-200 shadow hover:shadow-lg place-content-center rounded-lg"
    >
      <Link href={`/character/${props?.id}`}>
        <Card className="rounded-lg p-2 w-full h-full flex items-end">
          {props.showEdit && (
            <Link
              href={`/my-characters/create${props.id ? `?id=${props.id}` : ""}${
                props.model ? `&model=${props.model}` : ""
              }`}
              className="absolute z-[4] right-4 top-4 group-hover:flex hidden items-center"
            >
              <Button
                variant="outline"
                className="h-5 rounded-full text-xs md:text-[10px] border-none"
              >
                Edit
              </Button>
            </Link>
          )}
          {props.showRemix && (
            <Link
              href={`/my-characters/create${
                props.id ? `?remixId=${props.id}` : ""
              }`}
              className="absolute z-[4] right-4 top-4 group-hover:flex hidden items-center"
            >
              <Button
                variant="outline"
                className="h-5 rounded-full text-xs md:text-[10px] border-none"
              >
                <Repeat className="w-3 h-3 p-0.5" />
                Remix
              </Button>
            </Link>
          )}
          <div className="absolute z-[3] top-4">
            <ModelBadge modelName={props.model as string} />
          </div>
          <CardHeader className="relative w-full p-4 z-[2]">
            {props.cardImageUrl && (
              <div className="bg-gradient-to-b from-transparent via-black/60 to-black absolute -left-[10px] -bottom-[9px] w-[calc(100%+20px)] h-[calc(100%+2rem)] rounded-b-lg" />
            )}
            <CardTitle
              className={`${
                props.cardImageUrl ? "text-white" : "text-foreground"
              } text-base line-clamp-1 hover:line-clamp-none select-none group-hover:opacity-80 duration-200 z-[3] flex justify-between`}
            >
              <div className="w-[80%] truncate">{props.name}</div>
              {(props?.numChats as number) > 0 && (
                <Tooltip content={`Number of chats with ${props.name}`}>
                  <div className="text-white text-xs rounded-full group-hover:opacity-80 duration-200 z-[3] flex gap-0.5 items-center">
                    <MessagesSquare className="w-5 h-5 p-1 aspect-square" />
                    {nFormatter(props?.numChats as number)}
                  </div>
                </Tooltip>
              )}
              {props.isDraft && <DraftBadge />}
            </CardTitle>
            <CardDescription
              className={`${
                props.cardImageUrl ? "text-white" : "text-foreground"
              } select-none text-xs line-clamp-3 hover:line-clamp-none group-hover:opacity-80 duration-200 z-[3]`}
            >
              {props.description}
            </CardDescription>
          </CardHeader>
          {props.cardImageUrl && (
            <Image
              src={props.cardImageUrl}
              alt={""}
              width={300}
              height={525}
              quality={60}
              className="object-cover absolute w-full h-full rounded-lg left-0 top-0 pointer-events-none z-[1]"
            />
          )}
        </Card>
      </Link>
    </AspectRatio>
  );
};

export default CharacterCard;
