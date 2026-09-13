import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import { ChatWidgetProvider } from "@/components/chat/ChatWidgetProvider";

const displayFont = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vayuvega — The Monsoon's Speedster",
  description:
    "Vayuvega is a Kerala-rooted speedster whose powers rise with the southwest monsoon. Ask for help — he's listening.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-zinc-100">
        <ChatWidgetProvider>{children}</ChatWidgetProvider>
      </body>
    </html>
  );
}
