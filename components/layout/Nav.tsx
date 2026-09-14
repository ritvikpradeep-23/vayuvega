"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WindSpiralIcon } from "@/components/ui/WindSpiralIcon";
import { useChatWidget } from "@/components/chat/ChatWidgetProvider";

const LINKS = [
  { label: "ORIGIN", href: "/#origin" },
  { label: "CASES", href: "/#cases" },
  { label: "COSTUMES", href: "/#costumes" },
  { label: "SIGHTINGS", href: "/#sightings" },
  { label: "MEDIA", href: "/media" },
  { label: "VILLAINS", href: "/villains" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openChat } = useChatWidget();

  return (
    <header className="sticky top-0 z-40 border-b border-card-border/60 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <WindSpiralIcon className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-wide text-kasavu">VAYUVEGA</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-widest text-mist transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={openChat}
            className="rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-6 py-2.5 text-xs font-bold tracking-widest text-void"
          >
            ASK FOR HELP
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-cream" />
          <span className="h-0.5 w-6 bg-cream" />
          <span className="h-0.5 w-6 bg-cream" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-void lg:hidden"
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-6 text-3xl text-cream"
            >
              ✕
            </button>
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest text-cream"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openChat();
              }}
              className="mt-4 rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-8 py-3 text-sm font-bold tracking-widest text-void"
            >
              ASK FOR HELP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
