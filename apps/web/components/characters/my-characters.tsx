import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/src/components";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import CharacterCardPlaceholder from "../cards/character-card-placeholder";
import CharacterCard from "../cards/character-card";
import { AspectRatio } from "@repo/ui/src/components/aspect-ratio";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { InfoTooltip, TooltipContent } from "@repo/ui/src/components/tooltip";
import { useInView } from "framer-motion";
import Link from "next/link";

const NewCharacter = () => {
  return (
    <Link href="/my-characters/create">
      <AspectRatio
        ratio={1 / 1.75}
        className="group w-full h-full hover:-translate-y-1 duration-200 border border-dashed hover:shadow-lg place-content-center rounded-lg"
        role="button"
      >
        <Card className="rounded-lg p-2 w-full h-full flex items-center justify-center border-none gap-2">
          <Plus /> Create character
        </Card>
      </AspectRatio>
    </Link>
  );
};

export function MyCharacters() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.characters.listMy,
    {},
    { initialNumItems: 10 }
  );
  const allCharacters = results || [];
  const characters = allCharacters.filter((character) => character.name);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      loadMore(10);
    }
  }, [inView, loadMore]);
  return (
    <Card className="w-full h-full shadow-none lg:shadow-xl border-transparent lg:border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          My Characters
          <InfoTooltip
            content={
              <TooltipContent
                title={
                  "Create interactive characters using our tools. All characters on the home page were made this way."
                }
              />
            }
          />
        </CardTitle>
        <CardDescription>Create and customize characters.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 flex flex-col sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4">
        <NewCharacter />
        {characters
          ? characters.map(
              (character) =>
                character.name && (
                  <CharacterCard
                    id={character._id}
                    key={character._id}
                    name={character.name}
                    numChats={character.numChats as number}
                    showEdit={true}
                    cardImageUrl={character.cardImageUrl as string}
                    description={character.description}
                    isDraft={character.isDraft}
                    model={character.model}
                  />
                )
            )
          : Array.from({ length: 12 }).map((_, index) => (
              <CharacterCardPlaceholder key={index} />
            ))}
        {Array.from({ length: 10 - characters?.length - 1 }).map((_, index) => (
          <CharacterCardPlaceholder key={index} />
        ))}
      </CardContent>
      <div ref={ref} />
    </Card>
  );
}
