import { PageProps } from "@/types";

export default function getParam<T extends { [key: string]: string }>(
  params: PageProps<T>["params"],
  prop: keyof T
): Promise<T[keyof T] | undefined> {
  return params
    .then((p) =>
      Array.isArray(p[prop]) || typeof p[prop] === "string"
        ? p[prop]
        : undefined
    )
    .catch(() => undefined);
}
