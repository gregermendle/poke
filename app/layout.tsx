import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const fetchCache = "default-cache";

export const metadata: Metadata = {
  title: "Pokemans",
  description: "View Pokemans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
