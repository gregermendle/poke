import List, { ListSkeleton } from "@/app/_components/list";
import { Search } from "@/app/_components/search";
import getSearchParam from "@/lib/get-search-param";
import { type PageProps } from "@/types";
import { Suspense } from "react";

export default async function Home({ searchParams }: PageProps) {
  const search = await getSearchParam(searchParams, "search");
  const searchTerm = typeof search === "string" ? search : undefined;

  return (
    <main className="grid max-w-xl mx-auto p-4 pt-0 space-y-2">
      <Search defaultValue={searchTerm} />
      <Suspense fallback={<ListSkeleton />}>
        <List search={searchTerm} />
      </Suspense>
    </main>
  );
}
