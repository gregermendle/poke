"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense, use, useEffect, useRef, useState } from "react";
import { getPokemonByName } from "@/lib/poke";
import { type Pokemon } from "pokedex-promise-v2";
import { type PromiseUnion } from "@/lib/safe-promise";
import Image from "next/image";

interface ListItemProps {
  name: string;
}

export default function ListItem({ name }: ListItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [promise, setPromise] = useState<Promise<PromiseUnion<Pokemon>> | null>(
    null
  );

  useEffect(() => {
    if (!itemRef.current) return;

    async function loadData() {
      setPromise(getPokemonByName(name));
      obs.disconnect();
    }

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadData();
    });

    obs.observe(itemRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <li ref={itemRef} className="h-8">
      <Link
        scroll={false}
        prefetch
        href={`/pokemon/${encodeURIComponent(name)}`}
        className="capitalize flex items-center gap-2 hover:underline focus-visible:underline underline-offset-2"
      >
        <Suspense
          fallback={
            <Avatar>
              <AvatarFallback className="uppercase">
                {name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          }
        >
          <ListItemAvatar name={name} pokemonPromise={promise} />
        </Suspense>
        {name}
      </Link>
    </li>
  );
}

interface ListItemAvatarProps extends ListItemProps {
  pokemonPromise: Promise<PromiseUnion<Pokemon>> | null;
}

export function ListItemAvatar({ name, pokemonPromise }: ListItemAvatarProps) {
  const response = pokemonPromise ? use(pokemonPromise) : null;

  return (
    <Avatar>
      <AvatarFallback className="uppercase">
        {name.substring(0, 2)}
      </AvatarFallback>
      {response?.type === "ok" &&
        typeof response.data.sprites.front_default === "string" && (
          <AvatarImage
            loading="lazy"
            src={response.data.sprites.front_default}
            asChild
          >
            <Image
              src={response.data.sprites.front_default}
              alt={response.data.name}
              width={104}
              height={104}
            />
          </AvatarImage>
        )}
    </Avatar>
  );
}
