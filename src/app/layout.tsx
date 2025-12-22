import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/ClientLayout";
import { RouteProvider } from "@/context/routecontext";
import ParticleBG from "@/components/ParticleBG";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cole Bennett's Portfolio",
  description: "Website made by Cole Bennett to display his portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    
    <html lang="en" className="flex flex-col h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ParticleBG
          density={22000}
          color="#dcc681"
          linkDist={110}
          mouseDist={150}
          speed={0.25}
          alpha={0.4}
        />
        <RouteProvider>
          <ClientLayout>{children}</ClientLayout>
        </RouteProvider>
      </body>
    </html>
  );
}
