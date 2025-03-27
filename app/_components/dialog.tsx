"use client";

import { DialogContent, Dialog as UIDialog } from "@/components/ui/dialog";
import { type DialogProps } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DialogCaptureContext = React.createContext({
  capture: "",
  setCapture: (_: string) => {},
});

export function DialogCapture({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setCapture } = useContext(DialogCaptureContext);

  useEffect(() => {
    const elem = contentRef.current;
    if (!elem) return;
    setCapture(elem.innerHTML);
    const obs = new MutationObserver(() => {
      setCapture(elem.innerHTML);
    });
    obs.observe(elem, { childList: true, attributes: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid gap-4" ref={contentRef}>
      {children}
    </div>
  );
}

export default function Dialog({ children, ...rest }: DialogProps) {
  const router = useRouter();
  const contentRef = useRef<React.ComponentRef<typeof DialogContent>>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [capture, setCapture] = useState<string>("");

  useEffect(() => {
    if (pathname.includes("/pokemon")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <DialogCaptureContext.Provider
      value={useMemo(() => ({ capture, setCapture }), [])}
    >
      <UIDialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            router.back();
          }
        }}
        {...rest}
      >
        <DialogContent ref={contentRef} className="w-96">
          {isOpen ? (
            children
          ) : (
            <div
              className="grid gap-4"
              dangerouslySetInnerHTML={{ __html: capture }}
            />
          )}
        </DialogContent>
      </UIDialog>
    </DialogCaptureContext.Provider>
  );
}
