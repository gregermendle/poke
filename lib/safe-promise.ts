export type PromiseUnion<T> =
  | {
      type: "ok";
      data: T;
    }
  | {
      type: "error";
      error: Error;
    };

export async function safePromise<T>(p: Promise<T>): Promise<PromiseUnion<T>> {
  try {
    return {
      type: "ok",
      data: await p,
    };
  } catch (err: unknown) {
    return {
      type: "error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}
