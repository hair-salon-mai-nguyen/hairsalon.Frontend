import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GoogleMapSection } from "@/components/google-map-section";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-[73px] flex flex-col">{children}</main>
      <GoogleMapSection />
      <Footer />
    </>
  );
}
