import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { MockStoreProvider } from "@/context/mock-store";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAI NGUYEN Wigs Atelier - Premium Wigs from 100% Human Hair",
  description: "MAI NGUYEN Wigs Atelier designs and tailors premium human hair wigs. Handcrafted custom luxury wigs with HD lace and realistic scalp simulators.",
  keywords: "luxury wigs, human hair wigs, mai nguyen wigs, custom wigs, wigs atelier vietnam, premium lace wigs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${montserrat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans">
        <MockStoreProvider>
          {children}
        </MockStoreProvider>
      </body>
    </html>
  );
}
