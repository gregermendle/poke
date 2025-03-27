"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useRef } from "react";
import Form, { type FormProps } from "next/form";
import { X } from "@/components/ui/icons";

interface SearchProps
  extends Omit<FormProps, "action">,
    Pick<React.ComponentProps<"input">, "defaultValue"> {}

export function Search({ defaultValue, ...props }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = useCallback(() => {
    if (!inputRef.current || !formRef.current) return;
    inputRef.current.defaultValue = "";
    inputRef.current.value = "";
    formRef.current.requestSubmit();
  }, []);

  return (
    <Form
      ref={formRef}
      scroll={false}
      className="group sticky top-0 pt-4 z-10 bg-gradient-to-b from-background to-transparent"
      onReset={handleReset}
      {...props}
      action=""
    >
      <div className="relative bg-background rounded-md">
        <Input
          ref={inputRef}
          id="search"
          name="search"
          defaultValue={defaultValue}
          placeholder='"Pikachu"'
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex gap-1 items-center">
          <Button
            size="sm"
            variant="outline"
            className="group-focus-within:text-yellow-600 transition-colors h-6 text-xs px-2 uppercase"
          >
            Search
          </Button>
          <Button
            size="icon"
            variant="outline"
            type="reset"
            className="h-6 w-6"
          >
            <X />
          </Button>
        </div>
      </div>
    </Form>
  );
}
