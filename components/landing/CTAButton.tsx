"use client";

import { useChatWidget } from "@/components/chat/ChatWidgetProvider";

export function CTAButton({ label, variant = "primary" }: { label: string; variant?: "primary" | "secondary" }) {
  const { openChat } = useChatWidget();

  const base = "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-bold tracking-widest transition-transform hover:scale-105";
  const styles =
    variant === "primary"
      ? `${base} bg-gradient-to-r from-kasavu to-kasavu-soft text-void shadow-lg shadow-kasavu/20`
      : `${base} border border-kasavu/50 text-cream hover:bg-kasavu/10`;

  return (
    <button onClick={openChat} className={styles}>
      {label}
    </button>
  );
}
