import { PageProps } from "@/types";

export default function getSearchParam(
  params: PageProps["searchParams"],
  prop: string
): Promise<string | string[] | undefined> {
  return params
    .then((p) =>
      Array.isArray(p[prop]) || typeof p[prop] === "string"
        ? p[prop]
        : undefined
    )
    .catch(() => undefined);
}
