import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPokemonByName, getSpeciesByName } from "@/lib/poke";
import React from "react";
import { AlertCircle } from "@/components/ui/icons";

interface DetailsProps {
  name: string;
}

export default async function Details({ name }: DetailsProps) {
  const response = await getPokemonByName(name);

  return (
    <>
      {response.type === "ok" ? (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${response.data.sprites.front_default})`,
                backgroundSize: "200%",
                backgroundPositionY: "50%",
                backgroundPositionX: "50%",
                filter: "blur(70px)",
                opacity: 0.2,
                position: "absolute",
                inset: 0,
              }}
            />
          </div>
          <DialogHeader>
            <div className="absolute -top-12 left-0 flex justify-center w-full pointer-events-none">
              <div className="relative flex shrink-0 overflow-hidden rounded-full w-26 h-26 border bg-background/10 backdrop-blur-sm">
                {response?.type === "ok" &&
                response.data.sprites.front_default ? (
                  <Image
                    className="aspect-square size-full"
                    src={response.data.sprites.front_default}
                    alt={response.data.name}
                    width={104}
                    height={104}
                  />
                ) : (
                  <div
                    className="
                      bg-muted flex size-full items-center justify-center rounded-full uppercase
                    "
                  >
                    {name.substring(0, 2)}
                  </div>
                )}
              </div>
            </div>
            <DialogTitle className="capitalize pt-10">
              {response.data.name}
            </DialogTitle>
            <DialogDescription className="-ml-1 flex gap-1">
              {response.data.types.map((type) => (
                <Badge
                  key={type.slot}
                  variant="outline"
                  className="bg-bakground/20 backdrop-blur-md"
                >
                  {type.type.name}
                </Badge>
              ))}
            </DialogDescription>
          </DialogHeader>
          <div className="grid items-center justify-center gap-6">
            <DetailDescription species={response.data.species.name} />
            <div>
              {response.data.stats.map((stat) => (
                <React.Fragment key={stat.stat.name}>
                  <div className="capitalize col-span-3 text-xs flex items-center gap-2 pb-1">
                    <span>{stat.stat.name}</span>
                    <span className="font-bold">({stat.base_stat})</span>
                  </div>
                  <div className="h-2 bg-foreground/10 backdrop-blur-sm rounded-full mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-foreground/60 to-foreground rounded-full"
                      style={{
                        width: `${Math.floor((stat.base_stat / 255) * 100)}%`,
                      }}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to load that Pokemon</AlertTitle>
          <AlertDescription>
            An error occurred while loading that Pokemon.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

interface DetailDescriptionProps {
  species: string;
}

export async function DetailDescription({ species }: DetailDescriptionProps) {
  const response = await getSpeciesByName(species);

  return (
    <>
      {response.type === "ok" ? (
        <p className="text-muted-foreground leading-5 text-sm">
          {response.data.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text ?? ""}
        </p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to load that Pokemon</AlertTitle>
          <AlertDescription>
            An error occurred while loading that Pokemon.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
