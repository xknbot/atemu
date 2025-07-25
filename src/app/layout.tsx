import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

import { Analytics } from "@vercel/analytics/next";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const ancientGod = localFont({
  src: "./fonts/Ancient God.woff2",
  display: "swap",
  variable: "--font-ancientGod",
});

const deSwash = localFont({
  src: "./fonts/DevinneSwash.woff2",
  display: "swap",
  variable: "--font-deSwash",
});

const spaceGames = localFont({
  src: "./fonts/Space Games.woff2",
  display: "swap",
  variable: "--font-spaceGames",
});

const fe = localFont({
  src: "./fonts/FeFCrm2.woff2",
  display: "swap",
  variable: "--font-fe",
});

const inconsolata = localFont({
  src: "./fonts/Inconsolata-ExtraBold.woff2",
  display: "swap",
  variable: "--font-incon",
});

export const metadata: Metadata = {
  title: "ATEMU",
  description: "TRADING CARD GAME",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inconsolata.className} ${spaceGames.variable} ${deSwash.variable} ${fe.variable} ${ancientGod.variable} w-full`}
    >
      <body className={` antialiased`}>
        <Header />
        {children}
        <ScrollToTopButton /> {/* Thêm nút Go to Top ở đây */}
        <Footer />
      </body>
    </html>
  );
}
