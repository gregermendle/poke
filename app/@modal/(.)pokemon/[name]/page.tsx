import Details, { DetailsSkeleton } from "@/app/_components/details";
import Dialog from "@/app/_components/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DialogContent } from "@/components/ui/dialog";
import getParam from "@/lib/get-param";
import { PageProps } from "@/types";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

export default async function PokemonIntercept({
  params,
}: PageProps<{ name: string }>) {
  const name = await getParam(params, "name");

  return (
    <Dialog>
      <DialogContent className="w-96">
        {typeof name === "string" ? (
          <Suspense fallback={<DetailsSkeleton />}>
            <Details name={name} />
          </Suspense>
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
