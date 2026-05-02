import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "West Edmonton Mall | The World's Most Immersive Retail Destination",
  description: "Discover West Edmonton Mall — 5.3M sq ft of premier retail, dining, entertainment, and event experiences. Over 800+ stores, 30M+ annual visitors.",
  keywords: "West Edmonton Mall, WEM, shopping mall, retail, entertainment, events, leasing, sponsorship, Edmonton, Canada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%', overflow: 'hidden' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ height: '100vh', overflow: 'hidden', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

