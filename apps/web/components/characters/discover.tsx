import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import CharacterCard from "../cards/character-card";
import CharacterCardPlaceholder from "../cards/character-card-placeholder";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const Discover = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.characters.list,
    {},
    { initialNumItems: 10 },
  );
  const allCharacters = results || [];
  const characters = allCharacters.filter(
    (character) => character.name && character.cardImageUrl,
  );
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      loadMore(10);
    }
  }, [inView, loadMore]);

  return (
    <>
      <div className="flex w-full grid-cols-2 flex-col gap-4 px-4 sm:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:px-0">
        {characters?.length > 0
          ? characters.map(
              (character, index) =>
                character.name && (
                  <CharacterCard
                    id={character._id}
                    key={character._id}
                    name={character.name}
                    numChats={character.numChats as number}
                    cardImageUrl={character.cardImageUrl as string}
                    description={character.description}
                    model={character.model}
                    showRemix={true}
                  />
                ),
            )
          : Array.from({ length: 10 }).map((_, index) => (
              <CharacterCardPlaceholder key={index} />
            ))}
        {status === "LoadingMore" &&
          Array.from({ length: 10 }).map((_, index) => (
            <CharacterCardPlaceholder key={index} />
          ))}
        <div ref={ref} />
      </div>
    </>
  );
};

export default Discover;
