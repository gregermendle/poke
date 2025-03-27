"use cache";

import Details from "@/app/_components/details";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertCircle, ChevronLeft } from "@/components/ui/icons";
import { PageProps } from "@/types";
import Link from "next/link";

export default async function PokemonPage({
  params,
}: PageProps<{ name: string }>) {
  const { name } = await params;

  return (
    <Dialog open>
      <DialogContent className="w-96" inline>
        <Button
          variant="outline"
          size="sm"
          className="absolute left-0 -top-12 h-8 text-xs rounded-full z-20"
          asChild
        >
          <Link href="/">
            <ChevronLeft />
            Search
          </Link>
        </Button>
        {typeof name === "string" ? (
          <Details name={name} />
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Pokemon supplied</AlertTitle>
            <AlertDescription>No Pokemon name was supplied.</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
