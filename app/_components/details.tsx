import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonByName, getSpeciesByName } from "@/lib/poke";
import { AlertCircle } from "lucide-react";
import React from "react";

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
              <Avatar className="w-26 h-26 border bg-background/10 backdrop-blur-sm">
                <AvatarFallback className="uppercase">
                  {response.data.name.substring(0, 2)}
                </AvatarFallback>
                {typeof response.data.sprites.front_default === "string" && (
                  <AvatarImage
                    asChild
                    src={response.data.sprites.front_default}
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

export function DetailsSkeleton() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">Loading...</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-background">
          <Skeleton className="w-26 h-26 rounded-full" />
        </div>
        <div className="pt-10">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-10 h-4" />
          <Skeleton className="w-10 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-56" />
      </div>
    </>
  );
}
