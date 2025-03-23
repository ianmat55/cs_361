"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 min-h-[100vh]">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
