import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creator Dashboard — @tenfoldmarc",
  description: "Content command center for @tenfoldmarc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen bg-[#0C0C0C] text-[#E8E8E8]">
        <Sidebar />
        <main className="ml-60 flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
