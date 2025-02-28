import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/NavigationBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sora – AI Chatbot",
  description: "Sora is an advanced AI chatbot built by Manik Lakhanpal, powered by Google Gemini's API for intelligent and dynamic conversations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <Providers>
          <NavigationBar />
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}