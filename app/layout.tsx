import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ChatWidgetProvider } from "@/components/chat/ChatWidgetProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vayuvega — The Monsoon's Speedster",
  description:
    "Vayuvega is a Kerala-rooted monsoon speedster who protects the vulnerable and leaves no trace. Ask for help — he's listening.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-void text-cream">
        <ChatWidgetProvider>
          <Nav />
          {children}
          <Footer />
        </ChatWidgetProvider>
      </body>
    </html>
  );
}
