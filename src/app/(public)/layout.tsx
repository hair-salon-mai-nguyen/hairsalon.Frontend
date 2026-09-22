import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgressBar } from "@/components/ui/scroll-reveal";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
