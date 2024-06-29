"use client";

import { NeynarContextProvider, Theme } from "@neynar/react";
import "@neynar/react/dist/style.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import BookGrid from "../components/book-grid"
import Footer from "../components/footer"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NeynarContextProvider
          settings={{
            clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
            defaultTheme: Theme.Dark,
            eventsCallbacks: {
              onAuthSuccess: () => {},
              onSignout() {},
            },
          }}
        >
          <div className={inter.className}>{children}</div>
        </NeynarContextProvider>
      </body>
    </html>
  );
}
