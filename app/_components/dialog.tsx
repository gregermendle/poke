"use client";

import { Dialog as UIDialog } from "@/components/ui/dialog";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Dialog({ children, ...rest }: DialogProps) {
  const router = useRouter();
  return (
    <UIDialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back();
        }
      }}
      {...rest}
    >
      {children}
    </UIDialog>
  );
}
