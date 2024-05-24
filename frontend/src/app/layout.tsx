import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import StoreProvider from "./storeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Juidco Pfms",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ReactQueryClientProvider>
        <html lang="en" data-theme="sample">
          <body className={inter.className}>{children}</body>
        </html>
      </ReactQueryClientProvider>
    </StoreProvider>
  );
}
