import Dialog from "@/app/_components/dialog";
import { ReactNode } from "react";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      <Dialog>{modal}</Dialog>
    </>
  );
}
