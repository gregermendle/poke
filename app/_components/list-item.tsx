"use client";

import Link from "next/link";
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
            <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
              <div
                className="
        bg-muted flex size-full items-center justify-center rounded-full
      "
              >
                {name.substring(0, 2)}
              </div>
            </div>
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
    <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
      {response?.type === "ok" && response.data.sprites.front_default ? (
        <Image
          className="aspect-square size-full"
          src={response.data.sprites.front_default}
          alt={response.data.name}
          quality={1}
          width={32}
          height={32}
        />
      ) : (
        <div
          className="
        bg-muted flex size-full items-center justify-center rounded-full
      "
        >
          {name.substring(0, 2)}
        </div>
      )}
    </div>
  );
}
