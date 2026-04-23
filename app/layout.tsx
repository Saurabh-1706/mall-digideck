import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "West Edmonton Mall | The World's Most Immersive Retail Destination",
  description: "Discover West Edmonton Mall - 5.3M sq ft of premier retail, dining, entertainment, and event experiences. Over 800+ stores, 30M+ annual visitors.",
  keywords: "West Edmonton Mall, WEM, shopping mall, retail, entertainment, events, leasing, sponsorship, Edmonton, Canada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
