import Details from "@/app/_components/details";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import getParam from "@/lib/get-param";
import { PageProps } from "@/types";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-static";

export default async function PokemonPage({
  params,
}: PageProps<{ name: string }>) {
  const name = await getParam(params, "name");

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
