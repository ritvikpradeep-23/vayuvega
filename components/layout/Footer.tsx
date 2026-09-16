"use client";

import Link from "next/link";
import { WindSpiralIcon } from "@/components/ui/WindSpiralIcon";
import { useChatWidget } from "@/components/chat/ChatWidgetProvider";

export function Footer() {
  const { openChat } = useChatWidget();

  return (
    <footer className="border-t border-card-border/60 bg-void-deep px-6 py-12 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <WindSpiralIcon className="h-8 w-8" />
          <span className="font-display text-base font-bold tracking-wide text-kasavu">VAYUVEGA</span>
        </Link>
        <div className="flex gap-6 text-xs font-semibold tracking-widest text-mist">
          <Link href="/" className="hover:text-cream">
            WEB
          </Link>
          <button onClick={openChat} className="hover:text-cream">
            CONTACT
          </button>
          <Link href="/privacy" className="hover:text-cream">
            PRIVACY
          </Link>
        </div>
        <p className="text-xs text-mist/70">© 2026 Vayuvega Help Portal · Kerala, India · All incidents handled</p>
      </div>
    </footer>
  );
}
