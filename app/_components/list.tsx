import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { safePromise } from "@/lib/safe-promise";
import { poke } from "@/lib/poke";
import { Skeleton } from "@/components/ui/skeleton";
import ListItem from "@/app/_components/list-item";

interface ListProps {
  search?: string;
}

export default async function List({ search }: ListProps) {
  const response = await safePromise(
    poke
      .getPokemonsList()
      .then((data) =>
        data.results.filter(
          (pokemon) =>
            !search ||
            pokemon.name
              .toLocaleLowerCase()
              .search(search.toLocaleLowerCase()) !== -1
        )
      )
  );

  return (
    <>
      {response.type === "ok" ? (
        <div>
          <p className="text-muted-foreground text-sm pb-2">
            {search ? (
              <>
                {response.data.length} result
                {response.data.length > 1 ? "s" : ""} for "{search}"
              </>
            ) : (
              <>{response.data.length} Pokemon found</>
            )}
          </p>
          <ul>
            {response.data.map((pokemon) => (
              <ListItem key={pokemon.name} name={pokemon.name} />
            ))}
          </ul>
        </div>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to load Pokemon</AlertTitle>
          <AlertDescription>
            An error occurred while trying to load the list of Pokemon.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-52 h-4 pb-2" />
      <Skeleton className="w-52 h-4" />
      <Skeleton className="w-10 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
  );
}
