import Details from "@/app/_components/details";
import { DialogCapture } from "@/app/_components/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import getParam from "@/lib/get-param";
import { PageProps } from "@/types";
import { AlertCircle } from "lucide-react";

export default async function PokemonIntercept({
  params,
}: PageProps<{ name: string }>) {
  const name = await getParam(params, "name");

  return (
    <DialogCapture>
      {typeof name === "string" ? (
        <Details name={name} />
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Pokemon supplied</AlertTitle>
          <AlertDescription>No Pokemon name was supplied.</AlertDescription>
        </Alert>
      )}
    </DialogCapture>
  );
}
